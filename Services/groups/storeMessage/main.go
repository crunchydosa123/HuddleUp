package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var db = dynamodb.New(session.Must(session.NewSession()))

type Message struct {
	GroupID   string `json:"groupID"`
	UserID    string `json:"userID"`
	Message   string `json:"message"`
	Timestamp string `json:"timestamp"`
}

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var msg Message

	// Unmarshal the incoming JSON payload into the Message struct
	err := json.Unmarshal([]byte(request.Body), &msg)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Invalid input format",
		}, nil
	}

	// Set timestamp
	msg.Timestamp = time.Now().Format(time.RFC3339)

	// Save the message to the Messages table
	_, err = db.PutItem(&dynamodb.PutItemInput{
		TableName: aws.String("Messages"),
		Item: map[string]*dynamodb.AttributeValue{
			"GroupID": {
				S: aws.String(msg.GroupID),
			},
			"Timestamp": {
				S: aws.String(msg.Timestamp),
			},
			"Message": {
				S: aws.String(msg.Message),
			},
			"UserID": {
				S: aws.String(msg.UserID),
			},
		},
	})
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       fmt.Sprintf("Failed to save message: %v", err),
		}, nil
	}

	// Add user to the UserGroups table
	_, err = db.PutItem(&dynamodb.PutItemInput{
		TableName: aws.String("UserGroups"),
		Item: map[string]*dynamodb.AttributeValue{
			"UserID": {
				S: aws.String(msg.UserID),
			},
			"GroupID": {
				S: aws.String(msg.GroupID),
			},
			"JoinedAt": {
				S: aws.String(msg.Timestamp),
			},
		},
	})
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       fmt.Sprintf("Failed to add user to group: %v", err),
		}, nil
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Message stored successfully",
	}, nil
}

func main() {
	lambda.Start(handler)
}
