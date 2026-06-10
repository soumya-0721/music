const express = require('express');
const router = express.Router();
const Album = require('../models/Album');

// @route   GET /api/albums
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, genre } = req.query;
    const query = {};
    if (genre) query.genre = genre;

    const albums = await Album.find(query)
      .sort({ releaseYear: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('songs');

    const total = await Album.countDocuments(query);

    res.json({
      success: true,
      data: { items: albums, total, page: parseInt(page), limit: parseInt(limit), hasMore: page * limit < total },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/albums/:id
router.get('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate('songs');
    if (!album) {
      return res.status(404).json({ success: false, message: 'Album not found' });
    }
    res.json({ success: true, data: album });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
