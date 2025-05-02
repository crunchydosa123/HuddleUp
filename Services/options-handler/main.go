package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

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
	lambda.Start(handlerOptions)
}
