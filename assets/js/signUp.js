var app = {};

app.signUp = function(){
  
    app.userName        =           $('#userName').val();
    app.password        =           $('#password').val();
    app.email           =           $('#form-email').val();
    app.phoneNumber     =           $('#form-phone').val();
    app.emailRegex      =           /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    /*
        Put the User input validation logic here.
    */
    if (!app.userName) {
        alert("Please provide a user name");
        return;
    }

    if (!app.password) {
        alert("Please provide a password");
        return;
    }

    if (!app.email) {
        alert("Please provide an Email address");
        return;
    } 

    if(!app.emailRegex.test(app.email)){
       alert("Please provide a valid Email address");
       return; 
    }

    if (!app.phoneNumber) {
        alert("Please provide a Phone Number");
        return;
    }

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
        UserPoolId : 	APP_CONSTANT.USER_POOL_ID,
        ClientId : 	APP_CONSTANT.CLIENT_ID
    };
    userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : app.email //Email Id where the confirmation code would be sent.
    };
    var dataPhoneNumber = {
        Name : 'phone_number',
        Value : app.phoneNumber
    };
    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
	//Uncomment below once the phone number format is confirmed
    /*var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);*/

    attributeList.push(attributeEmail);
   /* attributeList.push(attributePhoneNumber);*/
	// Put the user id and password collected from user below for signup
    userPool.signUp(app.userName, app.password, attributeList, null, function(err, result){
        if (err) {
            alert(err);
            return;
        }
        cognitoUser = result.user;
	// Return the user name once the user signed up, still need to confirm with confirmation code send to mail.
	$("#form-confirmCode").css("display", "block");
        alert('user name is ' + cognitoUser.getUsername());
	// Now since the user is signed up and pending for confirmaion, disable all the pervious input but confirmation code.
	$("#userName").prop("readonly", true);
	$("#password").prop("readonly", true);
	$("#form-email").prop("readonly", true);
	$("#form-phone").prop("readonly", true);
	$("#signUpBtn").hide();
	$("#confirm-block").show();
	
	var confirmationCode = prompt("Hello "+cognitoUser.getUsername+" Enter the confirmation code sent to your email address.","Confirmation code here");	
	cognitoUser.confirmRegistration(confirmationCode,true,function(err,result){
                if(err){
                        alert(err);
                        return;
                }
                console.log('Call Result: '+result);
        });
	return;
	
    });
};
