var signin = {};

signin.login = function(){

signin.userName 		= 	$("#loginUserName").val();
signin.userPassword		=	$("#loginPassword").val();

AWSCognito.config.region = 'us-east-1';
    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: '...' // your identity pool id here
    }); 

    // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
    AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'})

    var authenticationData = {
        Username : signin.userName,
        Password : signin.userPassword,
    };
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    var poolData = { 
        UserPoolId : APP_CONSTANT.USER_POOL_ID,
        ClientId :   APP_CONSTANT.CLIENT_ID
    };
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var userData = {
        Username : signin.userName,
        Pool : userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            // console.log('access token + ' + result.getAccessToken().getJwtToken());
            // var dynamodb = new AWS.DynamoDB({region: 'ap-southeast-1'});
            // console.log(dynamodb);

            AWS.config.update({
              credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: APP_CONSTANT.IDENTITY_POOL_ID
              }),
              region: 'us-east-1'
            });


            AWS.config.credentials.get(function(err) {
              if (err) console.log(err);
              else console.log(AWS.config.credentials);
            });
            
            var db =  new AWS.DynamoDB({region: 'ap-southeast-1'});
            db.listTables(function(err, data) {
                if (err) console.log(err, err.stack);
                else console.log(data.TableNames);
            });
        },

        onFailure: function(err) {
            alert(err);
        },

    });

};
