require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors(
  {
    origin: process.env.REDIRECT_URI,
    credentials: true
  }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.SPOTIFY_CLIENTID,
    clientSecret: process.env.SPOTIFY_SECRET,
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
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.SPOTIFY_CLIENTID,
    clientSecret: process.env.SPOTIFY_SECRET
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

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});