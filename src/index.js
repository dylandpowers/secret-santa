const bodyParser = require('body-parser');
const express = require('express');
const mm = require('./MatchMaker');
const path = require('path');

// Setup
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// catch-all
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * Add a new participant to the system. Name is contained
 * in the body of the request object.
 */
app.post('/participants/add', (req, res) => {
  mm.addParticipant(req.body, (err, success) => {
    if (err) {
      console.error(err);
      res.status(500).send('Something went wrong on our end');
    } else {
      res.status(200).send('Success');
    }
  });
});

/**
 * Count how many participants are currently active in the system.
 */
app.get('/participants/count', (req, res) => {
  mm.countParticipants((err, response) => {
    if (err) {
      console.error(err);
      res.status(500).send('Something went wrong on our end');
    } else {
      res.status(200).send(response);
    }
  });
});

/**
 * Get a match for a given participant
 */
app.get('/participants/match', (req, res) => {
  let name = req.query.name;
  console.log(req.query.name);
  try {
    mm.getMatch(name, (match) => {
      res.status(200).send(match);
    });
  } catch (err) {
    res.status(500).send('Something went wrong on our end');
  }
});

// confirmation page
app.get('/confirmation', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'confirmation.html'));
});

// listen on port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

