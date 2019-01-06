const { Client } = require('pg');

// config ==============================
const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: true
};

const client = new Client(config);
client.connect((err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log('Db connection succeeded');
  }
});


module.exports = client;