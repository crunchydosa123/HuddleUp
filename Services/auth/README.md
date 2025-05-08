Compress-Archive -Path .\bootstrap -DestinationPath .\function.zip

aws lambda update-function-code `
>>     --function-name SaveUserGroups `
>>     --zip-file fileb://function.zip
>> 