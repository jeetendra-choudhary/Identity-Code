var confirm = {};

confirm.confirmRegistration = function(confirmationCode){

	var poolData = {
		UserPoolId: '....', // Your user pool id here
		ClientId: '.......' // Your Application Client Id
	};

	var userPool = new AWSCognitoIdentityServiceProvider.CognitoUserPool(poolData);
	var userData = {
		UserName: 'username',
		Pool: userPool
	};

	var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.cognitoUser(userData);
	cognitoUser.confirmRegistration(confirmationCode,true,function(err,result){
		if(err){
			alert(err);
			return;
		}
		console.log('Call Result: '+result);
	});

	cognitoUser.resendConfimrationCode(function(err,result){
		if(err){
			alert(err);
			return;
		}
		console.log('Call result: '+result);
	});
}
