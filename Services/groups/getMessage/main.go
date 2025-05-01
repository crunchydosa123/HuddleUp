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
	tableName = "Messages"
	db        = dynamodb.New(session.Must(session.NewSession()))
)

type Message struct {
	Timestamp string `json:"timestamp"`
	SenderID  string `json:"senderId"`
	Message   string `json:"message"` // Changed to Message instead of Content
	GroupID   string `json:"groupId"`
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	groupID := request.QueryStringParameters["groupId"]
	if groupID == "" {
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: "Missing groupId"}, nil
	}

	input := &dynamodb.QueryInput{
		TableName: aws.String(tableName),
		KeyConditions: map[string]*dynamodb.Condition{
			"GroupID": {
				ComparisonOperator: aws.String("EQ"),
				AttributeValueList: []*dynamodb.AttributeValue{
					{S: aws.String(groupID)},
				},
			},
		},
		ScanIndexForward: aws.Bool(true), // oldest to newest
	}

	result, err := db.Query(input)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: fmt.Sprintf("Query error: %v", err)}, nil
	}

	messages := []Message{}
	for _, item := range result.Items {
		// Check if necessary fields are not nil before dereferencing
		if item["Timestamp"] == nil || item["UserID"] == nil || item["Message"] == nil || item["GroupID"] == nil {
			continue // Skip incomplete data
		}

		msg := Message{
			Timestamp: *item["Timestamp"].S,
			SenderID:  *item["UserID"].S,
			Message:   *item["Message"].S, // Use Message instead of Content
			GroupID:   *item["GroupID"].S,
		}
		messages = append(messages, msg)
	}

	resp, _ := json.Marshal(messages)
	return events.APIGatewayProxyResponse{StatusCode: 200, Body: string(resp)}, nil
}

func main() {
	lambda.Start(handler)
}
