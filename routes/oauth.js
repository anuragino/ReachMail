const express = require('express');
const fetch = require('node-fetch'); 
const { oauth2ClientGmail, oauth2ClientOutlook } = require('../config/oauth');
const router = express.Router();

// Gmail OAuth endpoint
router.get('/auth/gmail', (req, res) => {
  const url = oauth2ClientGmail.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://mail.google.com/']
  });
  res.redirect(url);
});

// Outlook OAuth endpoint
router.get('/auth/outlook', (req, res) => {
  const outlookUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${oauth2ClientOutlook.client_id}&response_type=code&redirect_uri=${encodeURIComponent(oauth2ClientOutlook.redirect_uri)}&response_mode=query&scope=openid email offline_access&state=12345`;
  res.redirect(outlookUrl);
});

// Gmail Callback
router.get('/auth/gmail/callback', async (req, res) => {
  const { code } = req.query; 
  try {
    const { tokens } = await oauth2ClientGmail.getToken(code); 
    oauth2ClientGmail.setCredentials(tokens); 
    res.send('Gmail connected successfully!');
  } catch (error) {
    console.error('Error during Gmail callback:', error);
    res.status(500).send('Error connecting to Gmail');
  }
});

// Outlook Callback
router.get('/auth/outlook/callback', async (req, res) => {
  const { code } = req.query; 
  try {
    const outlookAccessToken = await getOutlookAccessToken(code); 
    res.send('Outlook connected successfully!');
  } catch (error) {
    console.error('Error during Outlook callback:', error);
    res.status(500).send('Error connecting to Outlook');
  }
});

// Function to exchange code for Outlook access token
async function getOutlookAccessToken(code) {
  const tokenUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/token`;
  
  const requestBody = {
      client_id: oauth2ClientOutlook.client_id,
      code: code,
      redirect_uri: oauth2ClientOutlook.redirect_uri,
      grant_type: 'authorization_code',
  };
  
  const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(requestBody),
  });

  const responseBody = await response.text()

  if (!response.ok) {
      throw new Error('Failed to fetch Outlook access token');
  }
}



module.exports = router;
