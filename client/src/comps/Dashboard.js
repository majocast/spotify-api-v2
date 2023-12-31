import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsGithub } from 'react-icons/bs';
import { BiLogoSpotify } from 'react-icons/bi';
import useAuth from './useAuth';
import TopCard from './TopCard';
import ListCard from './ListCard';
import ProcessGenres from './ProcessGenres';
import UserProfile from './UserProfile';
import { Container, Row, Col } from 'react-bootstrap';
import SpotifyWebApi from'spotify-web-api-node';
import '../styles/styles.css';
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
    } else {
      return;
    }
  }, [accessToken]);


  //fetching data from spotify API
  useEffect(() => {
    //fetch top artists
    spotifyApi.getMyTopArtists()
    .then((data) => {
      const topArtists = data.body.items.map((artist) => ({
        name: artist.name,
        externalUrl: artist.external_urls.spotify,
        image: artist.images[1].url || null,
        genres: artist.genres,
      }));
      setTopArtists(topArtists);
    })
    .catch((err) => {
      console.log(err);
    })

    //fetch top tracks
    spotifyApi.getMyTopTracks()
      .then((data) => {
        const topTracks = data.body.items.map((tracks) => ({
          name: tracks.name,
          externalUrl: tracks.external_urls.spotify,
          image: tracks.album.images[1].url || null,
        }));
        setTopTracks(topTracks);
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
      })
      .catch((err) => {
        console.log(err);
      });

  }, [accessToken]);

  useEffect(() => {
    if(topArtists) {
      let topGenres = ProcessGenres(topArtists);
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

  if(!topArtists ||!topTracks ||!profile || !topGenres) {
    return <div className='w-100 h-100'>Loading...</div>
  } 

  const logout = async () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=ed78470013204123a5c4a1501c41364e&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=user-read-email%20user-read-private%20user-top-read&show_dialog=true`;
  }
  

  return (
    <Container 
      className = 'd-flex flex-column justify-content-center align-items-center h-100'
      style={{ fontWeight: '700', minHeight: '100vh', width: '100%', gap: '1rem'}}
    >
      <a href='https://www.spotify.com' target='_blank' rel='noopener noreferrer'>
        <BiLogoSpotify className='spotify' size={50} style={{ color:'#1DB954', position: 'absolute', top: '3%', left: '2%'}}/>
      </a>
      <button onClick={() => {logout()}} className='logout'>logout</button>
      <a href='https://github.com/majocast/spotify-api' target='_blank' rel='noopener noreferrer'>
        <BsGithub className='github' size={50} style={{ position: 'absolute', top: '2%', right: '2%'}}/>
      </a>
      <Row className='top-row align-items-end justify-content-center w-100'>
        <Col xs={12} md={4} className='order-sm-1 d-flex align-items-center justify-content-center'>
          <TopCard options={[topArtists, 'Top Artist']} />
        </Col>
        <Col xs={{order: 'first'}} md={4} className='order-sm-2 d-flex align-items-center justify-content-center'>
          <UserProfile options={profile} />
        </Col>
        <Col xs={12} md={4} className='order-sm-3 d-flex align-items-center justify-content-center'>
          <TopCard options={[topTracks, 'Top Track']} />
        </Col>
      </Row>
      <Row className='align-items-top justify-content-center w-100'>
        <Col xs={12} md={4} className='order-sm-1'>
          <ListCard options={[topArtists, 'Next 5 Artists']} />
        </Col>
        <Col xs={{order: 'first'}} md={4} id='genre-cont' className=' order-sm-2 d-flex align-items-center justify-content-center'>
          <ChartCard data={topGenres} />
        </Col>
        <Col xs={12} md={4} className='order-sm-3'>
          <ListCard options={[topTracks, 'Next 5 Tracks']} />
        </Col>
      </Row>

    </Container>
  )
}

export default Dashboard;