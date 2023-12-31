import React from 'react';
import { Container } from 'react-bootstrap';

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=ed78470013204123a5c4a1501c41364e&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=user-read-email%20user-read-private%20user-top-read&show_dialog=true`;

const Login = () => {
  console.log(process.env.REACT_APP_REDIRECT_URI + ' login')
  return (
    <Container
      className = 'd-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh', backgroundColor: 'black' }}
    >
      <a className='btn btn-success btn-lg' href={ AUTH_URL }>
        Login with Spotify
      </a>
    </Container>
  )
}

export default Login;