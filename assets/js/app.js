var app = {};

app.configureCognito = function(){
	AWS.config.region = 'us-east-1';
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	    IdentityPoolId: 'YOUR_IDENTITY_POOL_ID',
	});	
	console.log(AWS.config.credentials);
	
	AWS.config.credentials.get(function(){
		var syncClient = new AWS.CognitoSyncManager();
		console.log(syncClient);
		syncClient.openOrCreateDataset('myDataset',function(err,dataset){
			dataset.put('myKey','myValue',function(err,record){
				dataset.synchronize({
					onSuccess: function(data,newRecords){
						// Handler Code Here....
						console.log(data);
					}
				});
			});	
		});	
	});	
}
