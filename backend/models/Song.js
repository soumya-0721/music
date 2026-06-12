const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a song title'],
    trim: true,
  },
  artist: {
    type: String,
    required: [true, 'Please add an artist name'],
    trim: true,
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  album: {
    type: String,
    required: true,
  },
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
  },
  albumArt: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  plays: {
    type: Number,
    default: 0,
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
  lyrics: {
    type: String,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

// Index for search
songSchema.index({ title: 'text', artist: 'text', album: 'text' });

module.exports = mongoose.model('Song', songSchema);
