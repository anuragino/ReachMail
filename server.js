require('dotenv').config();

const express = require('express');
const emailRoutes = require('./routes/oauth');
const { scheduleEmailProcessing } = require('./utils/queue');

const app = express();
app.use(express.json());

// Routes
app.use('/api', emailRoutes);

// Test route to schedule email processing (simulate an incoming email)
app.post('/api/send-email', (req, res) => {
  const { content, recipientEmail } = req.body;
  scheduleEmailProcessing(content, recipientEmail);
  res.status(200).send('Email scheduled for processing');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
