import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [mood, setMood] = useState('');
  const [songs, setSongs] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/mood', { text });
      setMood(res.data.mood);
      setSongs(res.data.tracks); // ✅ Fixed: was res.data.songs
    } catch (err) {
      console.error("API Error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div>
      <h1>Mood-Based Music Recommender</h1>
      <textarea
        placeholder="Type your feelings here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Get Recommendations</button>

      {mood && <h3>Detected Mood: {mood}</h3>}
      {songs.length > 0 && (
        <ul>
          {songs.map((song, i) => (
            <li key={i}>
              <a href={song.url} target="_blank" rel="noreferrer">
                {song.name} by {song.artist}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
