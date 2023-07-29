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
      className = 'd-flex flex-column justify-content-center align-items-center'
      style={{ fontWeight: '700', backgroundColor: 'black', minHeight: '100vh',gap: '1rem'}}
    >
      <Row className='align-items-end mt-4'>
        <Col >
          <TopCard options={[topArtists, 'Top Artist']} />
        </Col>
        <Col className='d-flex align-items-center justify-content-center'>
          <UserProfile options={profile} />
        </Col>
        <Col className='d-flex align-items-center justify-content-center'>
          <TopCard options={[topTracks, 'Top Track']} />
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col style={{backgroundColor: 'black'}}>
          <ListCard options={[topArtists, 'Next 5 Artists']} />
        </Col>
        <Col className='d-flex align-items-center justify-content-center'>
          
        </Col>
        <Col>
          <ListCard options={[topTracks, 'Next 5 Tracks']} />
        </Col>
      </Row>

    </Container>
  )
}

export default Dashboard;