const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log("hi");
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: 'ed78470013204123a5c4a1501c41364e',
    clientSecret: 'ec40e753e3d64d60ba58cf60c3f86460',
    refreshToken
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400)
    })
})

app.post('/login', (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: 'ed78470013204123a5c4a1501c41364e',
    clientSecret: 'ec40e753e3d64d60ba58cf60c3f86460'
  })

  spotifyApi.authorizationCodeGrant(code)
    .then(data => { 
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    }).catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
})

app.listen(3001);