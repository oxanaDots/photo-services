import crypto from 'crypto';

const port = 3003 || process.env.PORT;
const secret = crypto.randomBytes(32).toString('hex');
console.log("secret", secret);