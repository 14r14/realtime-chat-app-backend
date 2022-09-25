const crypto = require('crypto');

function generateCookieSecret() {
  return crypto.randomBytes(64).toString('hex');
};

console.log(generateCookieSecret());
