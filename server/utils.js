const crypto = require('crypto');

const hash = data => crypto.createHash('sha256').update(data).digest('base64');

const randomHex = () => randomBytes(32).toString('hex');

module.exports = { hash, randomHex };
