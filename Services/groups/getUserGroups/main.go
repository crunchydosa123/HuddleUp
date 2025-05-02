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
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

var (
	userGroupsTable = "UserGroups"
	groupsTable     = "Groups"
	db              = dynamodb.New(session.Must(session.NewSession()))
)

type GroupEntry struct {
	UserID  string `json:"UserID"`
	GroupID string `json:"GroupID"`
}

type GroupInfo struct {
	GroupID   string `json:"GroupID"`
	GroupName string `json:"GroupName"`
}

type Response struct {
	Groups []GroupInfo `json:"groups"`
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	userID := request.QueryStringParameters["UserID"]
	if userID == "" {
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: "Missing UserID parameter"}, nil
	}

	// Query UserGroups table by UserID
	queryInput := &dynamodb.QueryInput{
		TableName: aws.String(userGroupsTable),
		KeyConditions: map[string]*dynamodb.Condition{
			"UserID": {
				AttributeValueList: []*dynamodb.AttributeValue{
					{S: aws.String(userID)},
				},
				ComparisonOperator: aws.String("EQ"),
			},
		},
	}

	result, err := db.Query(queryInput)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: fmt.Sprintf("Query error: %v", err)}, nil
	}

	var entries []GroupEntry
	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &entries)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: fmt.Sprintf("Unmarshal error: %v", err)}, nil
	}

	var groups []GroupInfo
	for _, entry := range entries {
		getInput := &dynamodb.GetItemInput{
			TableName: aws.String(groupsTable),
			Key: map[string]*dynamodb.AttributeValue{
				"GroupID": {S: aws.String(entry.GroupID)},
			},
		}

		groupResult, err := db.GetItem(getInput)
		if err != nil || groupResult.Item == nil {
			continue // silently skip if group not found or error
		}

		var group GroupInfo
		err = dynamodbattribute.UnmarshalMap(groupResult.Item, &group)
		if err != nil {
			continue
		}

		groups = append(groups, group)
	}

	resp := Response{Groups: groups}
	respBody, _ := json.Marshal(resp)

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(respBody),
		Headers:    map[string]string{"Content-Type": "application/json"},
	}, nil
}

func main() {
	lambda.Start(handler)
}
