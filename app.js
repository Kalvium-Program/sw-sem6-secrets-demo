const fs = require('node:fs');
const path = process.env.DEMO_TOKEN_FILE;
if (!path) { console.error('Credential file path missing'); process.exit(1); }
try {
  const token = fs.readFileSync(path, 'utf8').trim();
  if (!token) throw new Error('empty');
  console.log(JSON.stringify({mode: process.env.APP_MODE, credentialLoaded: true}));
  setInterval(()=>{},60000);
} catch { console.error('Credential file unavailable or empty'); process.exit(1); }
