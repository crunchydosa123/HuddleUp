package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var (
	tableName = "UserGroups"
	db        = dynamodb.New(session.Must(session.NewSession()))
)

type Response struct {
	Message string `json:"message"`
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var input map[string]string
	err := json.Unmarshal([]byte(request.Body), &input)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: "Invalid request body"}, nil
	}

	userID := input["UserID"]
	groupID := input["GroupID"]

	if userID == "" || groupID == "" {
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: "Missing UserID or GroupID"}, nil
	}

	// Add User to Group in DynamoDB
	_, err = db.PutItem(&dynamodb.PutItemInput{
		TableName: aws.String(tableName),
		Item: map[string]*dynamodb.AttributeValue{
			"UserID":  {S: aws.String(userID)},
			"GroupID": {S: aws.String(groupID)},
		},
	})
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: fmt.Sprintf("Error saving to DynamoDB: %v", err)}, nil
	}

	response := Response{
		Message: "User added to group successfully",
	}
	respBody, _ := json.Marshal(response)
	return events.APIGatewayProxyResponse{StatusCode: 200, Body: string(respBody)}, nil
}

func main() {
	lambda.Start(handler)
}
