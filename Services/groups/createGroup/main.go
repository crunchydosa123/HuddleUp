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
	"github.com/google/uuid"
)

var (
	db              = dynamodb.New(session.Must(session.NewSession()))
	groupsTable     = "Groups"
	userGroupsTable = "UserGroups"
)

type Group struct {
	GroupName    string   `json:"GroupName"`
	OwnerID      string   `json:"OwnerID"`
	Participants []string `json:"Participants"`
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var input Group
	err := json.Unmarshal([]byte(request.Body), &input)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: "Invalid request body"}, nil
	}

	if input.GroupName == "" || input.OwnerID == "" {
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: "GroupName and OwnerID required"}, nil
	}

	// Generate UUID for group
	groupID := uuid.New().String()
	participants := append(input.Participants, input.OwnerID)

	// Save to Groups table
	_, err = db.PutItem(&dynamodb.PutItemInput{
		TableName: aws.String(groupsTable),
		Item: map[string]*dynamodb.AttributeValue{
			"GroupID":      {S: aws.String(groupID)},
			"GroupName":    {S: aws.String(input.GroupName)},
			"OwnerID":      {S: aws.String(input.OwnerID)},
			"Participants": {SS: aws.StringSlice(participants)},
		},
	})
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: fmt.Sprintf("Failed to create group: %v", err)}, nil
	}

	// Update UserGroups table
	for _, userID := range participants {
		_, err = db.PutItem(&dynamodb.PutItemInput{
			TableName: aws.String(userGroupsTable),
			Item: map[string]*dynamodb.AttributeValue{
				"UserID":  {S: aws.String(userID)},
				"GroupID": {S: aws.String(groupID)},
			},
		})
		if err != nil {
			return events.APIGatewayProxyResponse{StatusCode: 500, Body: fmt.Sprintf("Failed to update user group: %v", err)}, nil
		}
	}

	resp := map[string]string{
		"message": "Group created successfully",
		"GroupID": groupID,
	}
	body, _ := json.Marshal(resp)
	return events.APIGatewayProxyResponse{StatusCode: 200, Body: string(body)}, nil
}

func main() {
	lambda.Start(handler)
}