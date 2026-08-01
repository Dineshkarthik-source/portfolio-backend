// Run this once to turn your chosen password into a hash for .env
// Usage: node generate-password-hash.js "yourNewPassword"
const bcrypt = require('bcryptjs');

const password = process.argv[2];
if (!password) {
  console.log('Usage: node generate-password-hash.js "yourNewPassword"');
  process.exit(1);
}

bcrypt.hash(password, 10).then(hash => {
  console.log('\nAdd this line to your .env file:\n');
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
});
