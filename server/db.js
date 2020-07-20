const { Pool } = require('pg');

var pool;

const getPool = () => {
  if (pool) return pool;
  return new Pool({
    host: process.env.DB_URL,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: true,
  });
};

const makeQuery = async query => {
  try {
    // needs to be hoisted for some reason
    var client = await getPool().connect();
    const result = await client.query(query);
    return result;
  } finally {
    if (client) client.release();
  }
};

module.exports = { getPool, makeQuery };
