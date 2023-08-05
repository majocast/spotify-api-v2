const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
const env = require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'https://semiwrapped.onrender.com',
    clientId: `${env.parsed.SPOTIFY_CLIENTID}`,
    clientSecret: `${env.parsed.SPOTIFY_SECRET}`,
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
  console.log(process.env);
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'https://semiwrapped.onrender.com',
    clientId: `${env.parsed.SPOTIFY_CLIENTID}`,
    clientSecret: `${env.parsed.SPOTIFY_SECRET}`
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

app.listen(3001, () => {
  console.log('Listening on port 3001');
});