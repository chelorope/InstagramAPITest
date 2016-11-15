var express = require('express'),
  cors = require('cors'),
  https = require('https')

function getUserData(token) {
  return new Promise(function(resolve, reject) {
  https.get('https://api.instagram.com/v1/users/self/?' +
    'access_token=' + token,
    function(response) {
      // console.log(response);
      response.on('data', (d) => {
        resolve(d.toString('utf-8'))
      });
      response.on('error', (err) => {
        reject(err);
      });
    })
  }
}


var app = express();
app.use(cors());


app.get('/', function (req, res) {
  console.log(req.query.token);
  res.stautsCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  https.get('https://api.instagram.com/v1/users/self/?' +
    'access_token=' + req.query.token,
    getUserData(req.query.token)
      .then(function(response) {
        res.send(response);
      })
      .catch(function(err) {
        console.log(err);
      })
    })
});

app.listen(9090);
console.log('Listening on port 9090...');
