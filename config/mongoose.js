const mongoose = require('mongoose');

// deprecations -> https://mongoosejs.com/docs/deprecations.html
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/class_demo', {
  // MongoDB rewrote tool to parse connection strings
  useNewUrlParser: true, 
  // shows when using `findOneAndUpdate` and `findOneAndDelete`
  // Mongoose' uses MongoDB driver's `findAndModify` if flag is set to true b/c the
  // methods pre-date those supplied by MongoDB
  useFindAndModify: false,
  // uses new topology engine to handle server items such as reconnections 
  useUnifiedTopology: true
});

// MongoDB driver deprecated `ensureIndex()` in favor of `createIndex()`
// forces mongoose to use `createIndex`
mongoose.set('useCreateIndex', true);
// prints queries to console
mongoose.set('debug', false);

// db connection
module.exports = mongoose.connection;
