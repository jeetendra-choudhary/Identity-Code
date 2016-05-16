var app = {};

app.configureCognito = function(){
	AWSCognito.config.region = 'us-east-1';

	var poolData = {
	    UserPoolId: 'userPoolId',
	    ClientId: 'ClientId'
	};

	var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
	var userData = {
			UserName:'MyName',
			Pool: userPool
	};

	var attributeList = [];

	var dataEmail = {
		Name: 'email',
		Value: 'mailme@mydomain.com'
	};

	var dataPhoneNumber = {
		Name: 'phone_number',
		Value: '+9112212212212'
	};

	var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
	var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);
	
	attributeList.push(attributeEmail);
	attributeList.push(attributePhoneNumber);

	var cognitoUser;

	userPool.signUp('userName','password',attributeList,null,function(err,result){
		if(err){
			console.log(err);
			alert(err);
			return;
		}
		cognitoUser = result.user;
		console.log('User Name is: '+cognitoUser);
	});
	
};
