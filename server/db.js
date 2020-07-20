const { Pool } = require('pg');

var pool;

const getPool = () => {
  if (pool) return pool;
  return new Pool({
    host: process.env.DB_HOSTNAME,
    database: process.env.RDS_DB_NAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
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
