const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');
const { protect } = require('../middleware/auth');

// @route   GET /api/playlists
router.get('/', protect, async (req, res) => {
  try {
    const playlists = await Playlist.find({
      $or: [{ user: req.user._id }, { isPublic: true }],
    }).populate('songs', 'title artist albumArt duration');
    res.json({ success: true, data: playlists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/playlists
router.post('/', protect, async (req, res) => {
  try {
    const { name, description, coverArt, isPublic, isCollaborative } = req.body;
    const playlist = await Playlist.create({
      name, description, coverArt, isPublic, isCollaborative, user: req.user._id,
    });
    res.status(201).json({ success: true, data: playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/playlists/:id
router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('songs');
    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }
    res.json({ success: true, data: playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/playlists/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }
    if (playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const updated = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/playlists/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }
    if (playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Playlist deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/playlists/:id/songs
router.put('/:id/songs', protect, async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }

    const songIndex = playlist.songs.findIndex(s => s.toString() === songId);
    if (songIndex > -1) {
      playlist.songs.splice(songIndex, 1);
    } else {
      playlist.songs.push(songId);
    }

    await playlist.save();
    res.json({ success: true, data: playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
