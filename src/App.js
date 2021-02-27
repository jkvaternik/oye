import React, { useEffect, useState } from 'react';
import { authEndpoint, clientId, redirectUri, scopes } from './config.js';

import Home from './Home/Home';
import Login from './Login/Login';

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
  const [token, setToken] = useState(null);

  let href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`

  useEffect(() => {
    let _token = hash.access_token;

    if (_token) {
      setToken(_token)
    }
  }, []);

  return token ? <Home token={token} /> : <Login href={href} />;
}

export default App;
