const express = require('express');
const db = require('./config/mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// data parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// publicly serve static content
app.use(express.static('public'));

// load server routes
app.use(require('./routes')); 

// wait for db connection to be open before starting server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
});
