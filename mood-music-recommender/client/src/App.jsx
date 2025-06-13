import { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [songs, setSongs] = useState([]);
  const [mood, setMood] = useState('');

  const handleSubmit = async () => {
    const res = await axios.post('http://localhost:5000/api/mood', { text });
    setSongs(res.data.songs);
    setMood(res.data.mood);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>🎧 Mood-Based Music Recommender</h1>
      <textarea
        placeholder="How are you feeling today?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Get Recommendations</button>

      {mood && <h3>Mood detected: {mood}</h3>}

      <ul>
        {songs.map((song, i) => (
          <li key={i}>
            <img src={song.image} alt="cover" width="64" style={{ marginRight: 10 }} />
            <strong>{song.name}</strong> by {song.artist} –{' '}
            <a href={song.url} target="_blank" rel="noreferrer">Listen</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
