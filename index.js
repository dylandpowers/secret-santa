const bodyParser = require('body-parser');
const express = require('express');
const mm = require('./MatchMaker');
const path = require('path');

// Setup
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// catch-all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * Query the database for the currently existing pairing
 * for a given name.
 * @param {String} name
 */
app.post('/participants/add', (req, res) => {
  mm.addParticipant(req.body, (err, success) => {
    if (err) {
      console.log(err);
      res.status(500).send('Something went wrong on our end');
    } else {
      res.status(200).send('Success');
    }
  });
});

// listen on port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

