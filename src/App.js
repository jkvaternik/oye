import React, { useEffect, useState } from 'react';
import { authEndpoint, clientId, redirectUri, scopes } from './config.js';
import axios from 'axios';
import * as d3 from 'd3';

import './App.css';
import Home from './Home/Home';
import { select, svg } from 'd3';

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

const App = () => {
  const [token, setToken] = useState('');
  // const [state, setState] = useState();

  useEffect(() => {
    let _token = hash.access_token;

    if (_token) {
      setToken(_token)
    }
  }, []);

  return (
    <div className="App">
      <section>
        <h1>spotifyr</h1>
        <h3>Check out the data behind your music!</h3>
        {!token && (<a href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
          "%20"
        )}&response_type=token&show_dialog=true`}>
          Log In
        </a>)}
        {token && (<Home token={token} />)}
      </section>
    </div>
  );
}

export default App;
