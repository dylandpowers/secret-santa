const db = require('./db');

/**
 * Given a list of participants and matches, find a list of people
 * who have yet to be assigned AS matches (i.e. receiving gifts).
 * There are always guaranteed to be at least as many people giving 
 * gifts as receiving them.
 * @param {Array} list
 * @param {String} name
 */
function getUnusedReceivers(list, name) {
  if (list.length === 0) return [];
  const givers = list.map(participant => participant.name.toLowerCase());
  const receivers = list.map(participant => participant.match ? participant.match.toLowerCase() : "");

  // find all elements in givers that are NOT in receivers and also
  // are not the person , return it
  return givers.filter((person, index) => {
    return receivers.indexOf(person) === -1 // giver is not yet in receivers list
      && person !== name.toLowerCase(); // giver is not the person requesting a match
  });
}

/**
 * MatchMaker object for creating new pairings for Secret Santa.
 */
class MatchMaker {
  constructor() {}

  /**
   * Add a participant to the secret santa exchange, but without making matches yet.
   * @param {Object} info
   * @param {Function} callback
   */
  addParticipant(info, callback) {
    let email = info.email, name = info.name;
    let queryString = `INSERT INTO participants (name, email) VALUES (\'${name}\', \'${email}\');`;
    db.query(queryString, (err, res) => {
      callback(err, res);
    });
  }
  
  /**
   * Counts the number of participants currently in the system.
   * @param {Function} callback
   * @returns {Number}
   */
  countParticipants(callback) {
    let queryString = 'SELECT COUNT(*) FROM participants;';
    db.query(queryString, (err, res) => {
      callback(err, res);
    });
  }

  /**
   * Gets the match for a given participant.
   * @param {String} name
   * @param {Function} callback
   * @returns {String}
   */
  getMatch(name, callback) {
    db.query('SELECT name, match FROM participants;', (err, res) => {
      if (err) {
        console.error(err);
        throw err;
      } else {
        // extract just the names and matches from response object
        let unused = getUnusedReceivers(res.rows, name);
        let randIndex = Math.floor(Math.random() * unused.length);
        let match = unused[randIndex];

        // next, update the DB
        db.query(`UPDATE participants SET match = \'${match}\' WHERE LOWER(name) = LOWER(\'${name}\');`, (error, response) => {
          if (error) {
            console.error(error);
            throw error;
          } else {
            // call callback with match -> to update page
            callback(match);
          }
        });
      }
    });
  }
}

module.exports = new MatchMaker();