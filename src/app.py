import json
import boto3
import os

def lambda_handler(event, context):
    try:
        # 1. Parse incoming data safely
        body_content = event.get('body')
        
        # Check for completely empty body
        if not body_content or body_content.strip() == "":
            return {"statusCode": 400, "body": json.dumps({"error": "Empty body"})}
            
        # Safely attempt to parse JSON
        try:
            body = json.loads(body_content)
        except json.JSONDecodeError:
            return {"statusCode": 400, "body": json.dumps({"error": "Invalid JSON format"})}
        
        # Check for required fields
        if not body.get('user_id'):
            return {"statusCode": 400, "body": json.dumps({"error": "Missing required field: user_id"})}
        
        # 2. Get table name and connect to DynamoDB
        table_name = os.environ.get('TABLE_NAME')
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table(table_name)
        
        # 3. Save to DynamoDB
        table.put_item(Item={
            'user_id': body.get('user_id'),
            'name': body.get('name', 'Unknown') # Default name if missing
        })
        
        # 4. Return successful response
        return {
            "statusCode": 201,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "message": "User created successfully!",
                "received_id": body.get('user_id')
            })
        }
    except Exception as e:
        print(f"System ERROR: {str(e)}") 
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "Internal server error occurred."})
        }