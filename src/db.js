const { Client } = require('pg');

// config ==============================
const config = {
  connectionString: 'postgres://dylanpowers:@localhost:5432/dylanpowers'
};

const client = new Client(config);
client.connect((err) => {
  if (err) {
    console.log(err);
    throw err;
  } else {
    console.log('Db connection succeeded');
  }
});


module.exports = client;