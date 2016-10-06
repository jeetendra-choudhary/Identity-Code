# Authentication and Authorization using AWS Cognito User Pool

Important liberaries to use -
 - https://github.com/aws/amazon-cognito-identity-js/files/233157/sjcl.js.zip
 
 - Apart from the user inerface the main code lies in /assets/js/signup.js && /assests/js/ssignin.js

# Credentials and Required Configuration

## IDENTITY_POOL_ID
 - This is Pool Id which is specific to the application, an identity pool is a domain to manage all identities like federated identities i.e facebook, google+, twitter and developer provided identity e.t.c.
 - This can be obtained from - aws cognito -> Manage federated identity -> Edit -> identity pool Id

## USER_POOL_ID
 - USER POOL is a domain to manage and maintain the registered users for the application.
 - This can be obtained from aws cognito user pool.

## CLIENT_ID
 - This is application client id specific to application and can be obtained from aws cognito.

## The APP_CONSTANT.js File 
 - This is an important file which needs to be created in js folder with the same name. The basic structure for the file is -

 ```
 var APP_CONSTANT = {};
//This is the user pool id which will come from aws cognito user pool
APP_CONSTANT.USER_POOL_ID = 'PUT YOUR USER POOL ID HERE';
//This is the application client id which will come from aws cognito user pool
APP_CONSTANT.CLIENT_ID = 'PUT YOUR APP CLIENT ID HERE';
//This is the user pool id which will come from aws cognito -> Manage federated identity -> Edit -> identity pool Id
APP_CONSTANT.IDENTITY_POOL_ID = 'PUT YOUR IDENTITY POOL ID HERE';
```