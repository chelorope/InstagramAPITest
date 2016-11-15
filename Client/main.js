
var agent = require('superagent-promise')(require('superagent'), Promise);

var windowObjectReference;
var popWindowURL = 'https://api.instagram.com/oauth/authorize/?' +
  'client_id=CLIENT_ID' +
  'redirect_uri=http://1459a9bd.ngrok.io/popup/&response_type=token';
var popWindowName = "InstagramLogIn";
var popWindowFeatures = "menubar=no,location=yes,resizable=no,scrollbars=no" +
",status=no, height=250, width=500";

window.popupCallback = function(token) {
  agent
    .get('http://88c6830a.ngrok.io/')
    .query({token: token})
    .then(function(response) {
      document.getElementById("user").innerHTML = response.text;
    })
}

document.getElementById("sign-in").addEventListener('click', function() {
  windowObjectReference = window.open(popWindowURL, popWindowName, popWindowFeatures)
});
  // location.assign(popWindowName)})

    // agent
    //   .get('https://api.instagram.com/v1/users/self/')
    //   .query({access_token: location.hash.split('=')[1])})
    //   .then((response) => {
    //     console.log(response);
    //     })
// }
