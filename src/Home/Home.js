import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';

import Scatterplot from '../Scatterplot/Scatterplot';

const Home = (props) => {
  const [songs, setSongs] = useState([]);

  useEffect(async () => {
    const recentlyPlayed =
      await axios.get(
        `https://api.spotify.com/v1/me/player/recently-played?limit=50`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        }).then((response) => {
          let tracks = [];
          for (let item of response.data.items) {
            console.log(item)
            tracks.push({
              id: item.track.id,
              name: item.track.name,
              image: item.track.album.images[2]
            })
          }
          return tracks;
        }).catch((error) => {
          alert(error);
        });

    let ids = [];

    for (let item of recentlyPlayed) {
      ids.push(item.id)
    }

    const songFeatures =
      await axios.get(
        `https://api.spotify.com/v1/audio-features?ids=${ids.join('%2C')}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        }).then((response) => {
          let songData = []

          for (let item of response.data.audio_features) {
            songData.push({
              energy: item.energy,
              danceability: item.danceability
            })
          }

          return songData;
        }).catch((error) => {
          alert(error);
        });

    let songs_with_data = recentlyPlayed.map((track, i) => {
      return {
        ...track,
        ...songFeatures[i]
      }
    })

    setSongs(songs_with_data)
  }, []);

  const avg = (key) => {
    let sum = songs.reduce((acc, obj) => acc + obj[key], 0)
    return (sum/songs.length).toFixed(2)
  }

  return (
    <section>
      <p>Avg. Energy: {avg('energy')}</p>
      <p>Avg. Danceability: {avg('danceability')}</p>
      <Scatterplot data={songs}/>
    </section>
  )
}

export default Home;