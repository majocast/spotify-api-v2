import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react';
import Login from './comps/Login';
import Dashboard from './comps/Dashboard';


const code = new URLSearchParams(window.location.search).get('code')

const App = () => {
  return code ? <Dashboard code={code} /> : <Login />
}

export default App;