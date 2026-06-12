const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const Album = require('../models/Album');
const User = require('../models/User');

// @route   GET /api/search
router.get('/', async (req, res) => {
  try {
    const { q, type = 'all', page = 1, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({ success: false, message: 'Search query required' });
    }

    const searchRegex = new RegExp(q, 'i');
    const results = {};

    if (type === 'all' || type === 'songs') {
      results.songs = await Song.find({
        $or: [{ title: searchRegex }, { artist: searchRegex }, { album: searchRegex }],
      }).limit(parseInt(limit));
    }

    if (type === 'all' || type === 'albums') {
      results.albums = await Album.find({
        $or: [{ title: searchRegex }, { artist: searchRegex }],
      }).limit(parseInt(limit));
    }

    if (type === 'all' || type === 'artists') {
      results.artists = await User.find({
        $or: [{ fullName: searchRegex }, { username: searchRegex }],
      }).select('-password').limit(parseInt(limit));
    }

    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
