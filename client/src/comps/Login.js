import React from 'react';
import { Container } from 'react-bootstrap';

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=ed78470013204123a5c4a1501c41364e&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-top-read'

const Login = () => {
  return (
    <Container
      className = 'd-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <a className='btn btn-success btn-lg' href={ AUTH_URL }>
        Login with Spotify
      </a>
    </Container>
  )
}

export default Login;