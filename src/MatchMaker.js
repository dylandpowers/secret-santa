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
  const receivers = list.map(participant => participant.match.toLowerCase());

  // find all elements in givers that are NOT in receivers and also
  // are not the person , return it
  return givers.filter((person, index) => {
    return !receivers[index] || !(receivers[index] === name);
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
    const email = info.email, name = info.name;
    const queryString = `INSERT INTO participants (name, email) VALUES (\'${name}\', \'${email}\');`;
    db.query(queryString, (err, res) => {
      callback(err, res);
    });
  }

  /**
   * Gets a match (secret santa) for a given person.
   * @param {String} name 
   * @param {function} callback
   */
  // getMatch(name, callback) {
  //   db.getClientConnection()
  //     .then((client) => {
  //       client.query('SELECT * FROM participants;', (err, res) => {
  //         if (err) {
  //           console.log(err);
  //           throw err;
  //         } else {
  //           // loop through all current participants. If one does not have
  //           // a match, select its match from the names of participants
  //           const needGifts = getUnusedReceivers(res.rows, name);
  //           if (!needGifts || needGifts.length === 0) {
  //             // everybody has a match, throw an error
  //             throw new Error('All participants have been matched');
  //           }
  //           // find random part in the array, call callback with match
  //           const randInt = Math.floor(Math.random() * needGifts.length);
  //           const match = needGifts[randInt];
  //           callback(match);


  //           // finally, close connection
  //           db.endClientConnection();
  //         }
  //       });
  //     }).catch((err) => {
  //       console.log('Trouble connecting to DB', err);
  //       throw err;
  //     });
  // }
}

module.exports = new MatchMaker();