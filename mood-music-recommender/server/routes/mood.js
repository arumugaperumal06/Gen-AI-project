const express = require('express');
const router = express.Router();
const { PythonShell } = require('python-shell');
const { searchTracks } = require('../utils/spotify'); // ✅ Fixed import

router.post('/', async (req, res) => {
  const userText = req.body.text;

  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: './server/ml',
    args: [userText]
  };

  PythonShell.run('mood_detector.py', options, async (err, results) => {
    if (err || !results) {
      console.error("Python error:", err);
      return res.status(500).json({ error: "Mood detection failed" });
    }

    const mood = results[0];
    const trackData = await searchTracks(mood); // ✅ Fixed function name

    if (!trackData) {
      return res.status(500).json({ error: "Spotify fetch failed" });
    }

    res.json({ mood, tracks: trackData });
  });
});

module.exports = router;
