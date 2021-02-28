# Oye!

## clone and run

Follow these instructions to mess around with the repository code!

```
git clone ...
cd oye
npm install // install any dependencies
npm start
```
## concept
Oye! is a web application that visualizes a users Spotify’s data for music. Using React and D3.js, the application allows users to view a visualization of their recently played songs and playlists. The visualization consists of a scatter plot of songs from their recently played or selected playlist. 

Using Spotify API’s audio features for songs, I chose to display the energy and danceability of each song.

- Energy: "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity." ([*Spotify API*](https://developer.spotify.com/documentation/web-api/reference/#object-audiofeaturesobject))
  - represented on y-axis
  - ordinal attribute, sequential

- Danceability: "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable." ([*Spotify API*](https://developer.spotify.com/documentation/web-api/reference/#object-audiofeaturesobject))
  - represented on x-axis
  - ordinal Attribute, sequential
