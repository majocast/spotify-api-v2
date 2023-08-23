/*Version 1.5.0 Compliance Changes*/

import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import Login from './comps/Login';
import Dashboard from './comps/Dashboard';

const App = () => {
  const code = new URLSearchParams(window.location.search).get('code')
  console.log(code);
  return code ? <Dashboard code={code} /> : <Login />
}

export default App;