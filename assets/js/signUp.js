var app = {};
app.signUp = function(){
	AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: '...' // your identity pool id here
    });

    AWSCognito.config.region = 'us-east-1';
    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: '...' // your identity pool id here
    });

    // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
    AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'})

    var poolData = { 
        UserPoolId : 'user pool id collected from user pool',
        ClientId : 'application client id of app subscribed to user pool'
    };
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : 'email@mydomain.com' //Email Id where the confirmation code would be sent.
    };
    var dataPhoneNumber = {
        Name : 'phone_number',
        Value : '00000000000'
    };
    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
	//Uncomment below once the phone number format is confirmed
    /*var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);*/

    attributeList.push(attributeEmail);
   /* attributeList.push(attributePhoneNumber);*/
	// Put the user id and password collected from user below for signup
    userPool.signUp('username', 'password', attributeList, null, function(err, result){
        if (err) {
            alert(err);
            return;
        }
        cognitoUser = result.user;
	// Return the user name once the user signed up, still need to confirm with confirmation code send to mail.
        console.log('user name is ' + cognitoUser.getUsername());
    });
};
