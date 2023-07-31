import React, { useState, useEffect } from 'react';
import useAuth from './useAuth';
import TopCard from './TopCard';
import ListCard from './ListCard';
import ProcessGenres from './ProcessGenres';
import UserProfile from './UserProfile';
import { Container, Row, Col } from 'react-bootstrap';
import SpotifyWebApi from'spotify-web-api-node';
import ChartCard from './ChartCard';

const spotifyApi = new SpotifyWebApi({
  clientId: 'ed78470013204123a5c4a1501c41364e',
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [topArtists, setTopArtists] = useState(null);
  const [profile, setProfile] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [topGenres, setTopGenres] = useState([]);
  const genreColor = [
    {name: 'edm', color: 'linear-gradient(0deg, rgba(119,0,255,1) 0%, rgba(0,212,255,1) 50%, rgba(119,0,255,1) 100%)'},
    {name: 'r&b', color: 'linear-gradient(0deg, rgba(245,0,221,1) 0%, rgba(0,58,152,1) 50%, rgba(245,0,221,1) 100%)'},
    {name: 'pop', color: 'linear-gradient(0deg, rgba(252,103,238,1) 0%, rgba(255,190,0,1) 50%, rgba(252,103,238,1) 100%)'},
    {name: 'hip hop', color: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(251,0,0,1) 50%, rgba(0,0,0,1) 100%)'},
    {name: 'rap', color: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(251,0,0,1) 50%, rgba(0,0,0,1) 100%)'},
    {name: 'indie', color: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,173,0,1) 50%, rgba(0,0,0,1) 100%)'},
    {name: 'country', color: 'linear-gradient(0deg, rgba(252,241,197,1) 0%, rgba(255,173,0,1) 50%, rgba(252,241,197,1) 100%)'},
    {name: 'soul', color: 'linear-gradient(0deg, rgba(140,29,196,1) 0%, rgba(0,58,152,1) 50%, rgba(140,29,196,1) 100%)'},
    {name: 'alternative', color: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,173,0,1) 50%, rgba(0,0,0,1) 100%)'},
    {name: 'rock', color: 'linear-gradient(0deg, rgba(255,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(255,0,0,1) 100%)'},
    {name: 'k-pop', color: 'background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(251,29,253,1) 50%, rgba(0,0,0,1) 100%);'},
  ]



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
        genres: artist.genres,
      }));
      setTopArtists(topArtists);
      console.log(topArtists);
      console.log(topArtists[0].genres);
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

  useEffect(() => {
    if(topArtists) {
      let topGenres = ProcessGenres(topArtists);
      console.log(topGenres);
      setTopGenres(topGenres);
      const root = document.getElementById('root');
      const index = genreColor.findIndex((genre) => genre.name === topGenres[0].name);
      if(index !== -1) {
        root.style.background = genreColor[index].color;
      } else {
        root.style.background = 'black';
      }
    }
  }, [topArtists]);
      //

  if(!topArtists ||!topTracks ||!profile) {
    return <div>Loading...</div>
  } 

  

  return (
    <Container 
      className = 'd-flex flex-column justify-content-center align-items-center'
      style={{ fontWeight: '700', minHeight: '100vh',gap: '1rem'}}
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
        <Col>
          <ListCard options={[topArtists, 'Next 5 Artists']} />
        </Col>
        <Col className='d-flex align-items-center justify-content-center'>
          <ChartCard data={topGenres} />
        </Col>
        <Col>
          <ListCard options={[topTracks, 'Next 5 Tracks']} />
        </Col>
      </Row>

    </Container>
  )
}

export default Dashboard;