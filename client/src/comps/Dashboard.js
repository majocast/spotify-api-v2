import React, { useState, useEffect } from 'react';
import useAuth from './useAuth';
import TopCard from './TopCard';
import ListCard from './ListCard';
import UserProfile from './UserProfile';
import { Container, Row, Col } from 'react-bootstrap';
import SpotifyWebApi from'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: 'ed78470013204123a5c4a1501c41364e',
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [topArtists, setTopArtists] = useState([]);
  const [profile, setProfile] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    if(accessToken) {
      spotifyApi.setAccessToken(accessToken);
      console.log(accessToken);
    } else {
      return;
    }
  }, [accessToken]);


  //fetching data from spotify API
  useEffect(() => {
    //fetch top artists
    spotifyApi.getMyTopArtists()
    .then((data) => {
      console.log(data.body.items)
      const topArtists = data.body.items.map((artist) => ({
        name: artist.name,
        externalUrl: artist.external_urls.spotify,
        image: artist.images[1].url || null,
      }));
      setTopArtists(topArtists);
      console.log(topArtists);
    })
    .catch((err) => {
      console.log(err);
    })

    //fetch top tracks
    spotifyApi.getMyTopTracks()
      .then((data) => {
        console.log(data.body.items);
        const topTracks = data.body.items.map((tracks) => ({
          name: tracks.name,
          externalUrl: tracks.external_urls.spotify,
          image: tracks.album.images[1].url || null,
        }));
        setTopTracks(topTracks);
        console.log(topTracks);
      })
      .catch((err) => {
        console.log(err);
      })

    //fetch user profile
    spotifyApi.getMe()
      .then((data) => {
        const profile = {
          name: data.body.display_name,
          externalUrl: data.body.external_urls.spotify,
          image: data.body.images[1].url || null,
        }
        setProfile(profile);
        console.log(profile);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [accessToken]);

  if(!topArtists ||!topTracks ||!profile) {
    return <div>Loading...</div>
  }

  return (
    <Container 
      className = 'justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <Row>
        <Col>
          <TopCard options={topArtists} />
        </Col>
        <Col>
          <UserProfile options={profile} />
        </Col>
        <Col>
          <TopCard options={topTracks} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ListCard options={topArtists} />
        </Col>
        <Col>
          
        </Col>
        <Col>
          <ListCard options={topTracks} />
        </Col>
      </Row>

    </Container>
  )
}

export default Dashboard;