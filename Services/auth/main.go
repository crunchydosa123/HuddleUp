package main

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	UserID       string `json:"UserID"`
	Username     string `json:"Username"`
	Password     string `json:"Password"`
	PasswordHash string `json:"PasswordHash"`
	Email        string `json:"Email"`
}

var db = dynamodb.New(session.Must(session.NewSession()))
var tablename = "Users"

func HandleRequest(ctx context.Context, req events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	method := req.RequestContext.HTTP.Method
	path := req.RawPath

	fmt.Printf("Received request: method=%s, Path=%s, pathParameters=%v\n", method, path, req.PathParameters)

	switch method {
	case "GET":
		if path == "/profile" {
			return events.APIGatewayV2HTTPResponse{StatusCode: 400, Body: `{"error":"Invalid input"}`}, nil
		}

	case "POST":
		if path == "/login" {
			return handleLogin(req)
		} else if path == "/signup" {
			return handleSignup(req)
		}
	case "OPTIONS":
		return handlerOptions(req)

	default:
		return events.APIGatewayV2HTTPResponse{
			StatusCode: 405,
			Body:       "Method Not Allowed, hitting default case",
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}

	return events.APIGatewayV2HTTPResponse{
		StatusCode: 405,
		Body:       "Method Not Allowed, hitting default case",
		Headers:    map[string]string{"Content-Type": "application/json"},
	}, nil
}

func generateJWT(user User) (string, error) {
	jwtSecret := "12345"
	claims := jwt.MapClaims{
		"UserID":   user.UserID,
		"Username": user.Username,
		"Email":    user.Email,
		"exp":      time.Now().Add(24 * time.Hour).Unix(), // token expires in 24 hours
		"iat":      time.Now().Unix(),                     // issued at
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return "", err
	}

	return signedToken, nil
}

func handleSignup(req events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	var user User
	err := json.Unmarshal([]byte(req.Body), &user)

	if err != nil {
		fmt.Printf("Failed to unmarshal user: %v\n", err)
		return events.APIGatewayV2HTTPResponse{StatusCode: 400, Body: `{"error":"Invalid input"}`}, nil
	}

	user.UserID = user.Username

	getInput := &dynamodb.GetItemInput{
		TableName: aws.String(tablename),
		Key: map[string]*dynamodb.AttributeValue{
			"UserID": {
				S: aws.String(user.UserID),
			},
		},
	}

	result, err := db.GetItem(getInput)
	if err != nil {
		fmt.Printf("Failed to get item from db: %v\n", err)
		return events.APIGatewayV2HTTPResponse{StatusCode: 500, Body: `{"error":"Internal error"}`}, nil
	}

	if result.Item != nil {
		// User already exists
		return events.APIGatewayV2HTTPResponse{StatusCode: 409, Body: `{"error":"Username already taken"}`}, nil
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Printf("Failed to hash password: %v\n", err)
		return events.APIGatewayV2HTTPResponse{StatusCode: 500, Body: `{"error":"Internal error"}`}, nil
	}

	user.PasswordHash = string(hashedPassword)

	item, err := dynamodbattribute.MarshalMap(user)
	if err != nil {
		fmt.Printf("Failed to do use marshal map: %v\n", err)
		return events.APIGatewayV2HTTPResponse{StatusCode: 400, Body: `{"error":"Invalid input"}`}, nil
	}

	_, err = db.PutItem(&dynamodb.PutItemInput{
		TableName: aws.String(tablename),
		Item:      item,
	})

	if err != nil {
		fmt.Printf("Failed to put item in db: %v\n", err)
		return events.APIGatewayV2HTTPResponse{StatusCode: 400, Body: `{"error":"Invalid input"}`}, nil
	}
	fmt.Println("✅ User successfully written to DynamoDB.")

	body, _ := json.Marshal(user)
	return events.APIGatewayV2HTTPResponse{
		StatusCode: 200,
		Body:       string(body),
	}, nil
}

func handleLogin(req events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	var loginDetails map[string]string
	err := json.Unmarshal([]byte(req.Body), &loginDetails)

	if err != nil {
		fmt.Println("failed to unmarshal login details: %v\n", err)
		return events.APIGatewayV2HTTPResponse{
			StatusCode: 400,
			Body:       `{"error":"Invalid login data"}`,
		}, nil
	}

	username := loginDetails["Username"]
	password := loginDetails["Password"]

	if username == "" || password == "" {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: 400,
			Body:       `{"error":"Username and password are required"}`,
		}, nil
	}

	resp, err := db.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(tablename),
		Key:       map[string]*dynamodb.AttributeValue{"UserID": {S: aws.String(username)}},
	})

	if err != nil {
		fmt.Printf("Failed to get user from DynamoDB: %v\n", err)
		return events.APIGatewayV2HTTPResponse{
			StatusCode: 500,
			Body:       `{"error":"Internal server error"}, {%v}`,
		}, nil
	}

	if resp.Item == nil {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: 401,
			Body:       `{"error":"Get item not found"}`,
		}, nil
	}

	var storedUser User
	err = dynamodbattribute.UnmarshalMap(resp.Item, &storedUser)
	if err != nil {
		fmt.Printf("Failed to unmarshal user data: %v\n", err)
		return events.APIGatewayV2HTTPResponse{
			StatusCode: 500,
			Body:       `{"error":"Internal server error"}`,
		}, nil
	}

	err = bcrypt.CompareHashAndPassword([]byte(storedUser.PasswordHash), []byte(password))
	if err != nil {
		fmt.Printf("hashed password does not match %v\n", err)
		return events.APIGatewayV2HTTPResponse{
			StatusCode: 401,
			Body:       `{"error":"hashed password does not match, "}`,
		}, nil
	}

	token, err := generateJWT(storedUser)
	if err != nil {
		fmt.Printf("Failed to generate JWT: %v\n", err)
		return events.APIGatewayV2HTTPResponse{
			StatusCode: 500,
			Body:       `{"error":"Could not generate token"}`,
		}, nil
	}

	response := map[string]interface{}{
		"message":  "Login successful",
		"token":    token,
		"UserID":   storedUser.UserID,
		"Username": storedUser.Username,
		"Email":    storedUser.Email,
	}
	respJSON, _ := json.Marshal(response)

	return events.APIGatewayV2HTTPResponse{
		StatusCode: 200,
		Body:       string(respJSON),
		Headers:    map[string]string{"Content-Type": "application/json"},
	}, nil
}

func handlerOptions(req events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	return events.APIGatewayV2HTTPResponse{
		StatusCode: 200,
		Body:       "OK",
		Headers: map[string]string{
			"Content-Type":                 "application/json",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "OPTIONS,POST,GET",
			"Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token",
		},
	}, nil
}

func main() {
	lambda.Start(HandleRequest)
}
