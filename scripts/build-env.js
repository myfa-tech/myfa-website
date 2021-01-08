const fs = require('fs');

fs.writeFileSync('./.env', `
  REACT_APP_BACKEND_URL=${process.env.REACT_APP_BACKEND_URL}\n
  REACT_APP_FB_APP_ID=${process.env.REACT_APP_FB_APP_ID}\n
  REACT_APP_GOOGLE_CLIENT_ID=${process.env.REACT_APP_GOOGLE_CLIENT_ID}\n
  REACT_APP_STRIPE_PUSHABLE_API_KEY=${process.env.REACT_APP_STRIPE_PUSHABLE_API_KEY}\n
`);