var gmailApiSync = require('gmail-api-sync');
var accessToken = require('../token.json')

gmailApiSync.setClientSecretsFile('./client_secret.json');
 
var options = {
                query: 'from:*.org',
                format: 'full'
              }
 
gmailApiSync.authorizeWithToken(accessToken, function (err, oauth) {
    if (err) {
        console.log('Something went wrong: ' + err);
        return;
    }
    else {
        gmailApiSync.queryMessages(oauth, options, function (err, response) {
            if (err) {
                console.log('Something went wrong: ' + err);
                return;
            }
            console.log(JSON.stringify(response));
        });
    }
});