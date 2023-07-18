const mongoose = require('mongoose');

const diaryEntrySchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  entry: {
    type: String,
    required: true,
  }
});

const DiaryEntry = mongoose.model('DiaryEntry', diaryEntrySchema);

module.exports = DiaryEntry;
