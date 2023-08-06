import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios.post('https://semiwrapped-api.onrender.com/login', {
      code, 
    }).then(res => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setExpiresIn(res.data.expiresIn);
    }).catch(() => {
      window.location ='/';
    })
  }, [code]) 

  useEffect(() => {
    if(!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios.post('https://semiwrapped-api.onrender.com/refresh', {
        refreshToken,
        }).then(res => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        }).catch(() => {
          window.location ='/';
        })
    }, (expiresIn - 60) * 1000)
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn])

  return accessToken;
}

export default useAuth;