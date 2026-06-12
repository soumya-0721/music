const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an album title'],
    trim: true,
  },
  artist: {
    type: String,
    required: true,
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  coverArt: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
  },
  songCount: {
    type: Number,
    default: 0,
  },
  totalDuration: {
    type: Number,
    default: 0,
  },
  genre: {
    type: String,
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Album', albumSchema);
