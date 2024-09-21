// Gmail OAuth Setup
const { google } = require('googleapis');
const oauth2ClientGmail = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

// Outlook OAuth Setup
const outlook = require('node-outlook');
const oauth2ClientOutlook = {
  client_id: process.env.OUTLOOK_CLIENT_ID,
  client_secret: process.env.OUTLOOK_CLIENT_SECRET,
  redirect_uri: process.env.OUTLOOK_REDIRECT_URI
};

module.exports = { oauth2ClientGmail, oauth2ClientOutlook };
