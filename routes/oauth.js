const express = require('express');
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
  const outlookUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${oauth2ClientOutlook.client_id}&response_type=code&redirect_uri=${oauth2ClientOutlook.redirect_uri}&response_mode=query&scope=openid%20email%20offline_access&state=12345`;
  res.redirect(outlookUrl);
});

module.exports = router;
