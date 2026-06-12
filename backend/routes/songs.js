const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const { protect } = require('../middleware/auth');

// @route   GET /api/songs
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, genre, artist } = req.query;
    const query = {};
    if (genre) query.genre = genre;
    if (artist) query.artist = { $regex: artist, $options: 'i' };

    const songs = await Song.find(query)
      .sort({ plays: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Song.countDocuments(query);

    res.json({
      success: true,
      data: { items: songs, total, page: parseInt(page), limit: parseInt(limit), hasMore: page * limit < total },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/songs/:id
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ success: false, message: 'Song not found' });
    }
    res.json({ success: true, data: song });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/songs/:id/like
router.put('/:id/like', protect, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ success: false, message: 'Song not found' });
    }

    const index = song.likes.indexOf(req.user._id);
    if (index > -1) {
      song.likes.splice(index, 1);
    } else {
      song.likes.push(req.user._id);
    }

    await song.save();
    res.json({ success: true, data: { likes: song.likes.length, isLiked: index === -1 } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/songs/:id/play
router.put('/:id/play', async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      { $inc: { plays: 1 } },
      { new: true }
    );
    res.json({ success: true, data: { plays: song.plays } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
