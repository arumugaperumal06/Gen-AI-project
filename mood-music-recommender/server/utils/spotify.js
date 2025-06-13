const axios = require('axios');
require('dotenv').config();

let cachedToken = null;
let tokenExpireTime = 0;

async function getSpotifyToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpireTime) return cachedToken;

  const resp = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({ grant_type: 'client_credentials' }),
    {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  cachedToken = resp.data.access_token;
  tokenExpireTime = now + resp.data.expires_in * 1000;
  return cachedToken;
}

async function searchTracks(mood) {
  const token = await getSpotifyToken();
  const res = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(mood)}&type=track&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.tracks.items.map((track) => ({
    name: track.name,
    artist: track.artists[0].name,
    url: track.external_urls.spotify,
    image: track.album.images?.[1]?.url || ''
  }));
}

module.exports = { searchTracks };
