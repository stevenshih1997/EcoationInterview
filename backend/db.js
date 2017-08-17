var mongoose = require('mongoose');
// Connect to mLab mongodb database
mongoose.connect('mongodb://ecoation:ecoation@ds119223.mlab.com:19223/ecoation_interview_challenge', {
  useMongoClient: true
});
