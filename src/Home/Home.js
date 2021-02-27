import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';

import Scatterplot from '../Scatterplot/Scatterplot';

import styles from './Home.module.css';

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
    return (sum / songs.length).toFixed(2)
  }

  const max = (key) => {
    let _max = songs.reduce((acc, obj) => Math.max(obj[key], acc), 0)
    let maxSong = songs.find(song => song[key] === _max)
    return maxSong.image.url;
  }

  return (
    <section>
      {/* <div className={styles.Stats}>
        <div className={styles.Circle}>
          <h4>{avg('energy')}</h4>
          <p>Avg. Energy</p>
        </div>
        <div className={styles.Circle}>
          <img src={max('energy')} />
          <p>Max Energy</p>
        </div>
        <div className={styles.Circle}>
          <h4>{avg('danceability')}</h4>
          <p>Avg. Danceability</p>
        </div>
        <div className={styles.Circle}>
          <img src={max('danceability')} />
          <p>Max Danceability</p>
        </div>
      </div> */}
      <Scatterplot data={Object.assign(songs, {avgX: avg('danceability'), avgY: avg('energy')})} />
    </section>
  )
}

export default Home;