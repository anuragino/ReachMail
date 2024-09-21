const Agenda = require('agenda');
const { categorizeEmail, sendReply } = require('../controllers/email');

const mongoose = require('mongoose');
const mongoConnectionString = 'mongodb://localhost:27017/reachinbox';

// Connect to MongoDB to store job data
mongoose.connect(mongoConnectionString)
  .then(() => console.log('MongoDB connected')) 
  .catch((error) => console.log('MongoDB connection error:', error)); 


// Initialize Agenda with MongoDB connection and specify the collection for job data
const agenda = new Agenda({ db: { address: mongoConnectionString, collection: 'test' } });

// Define the job for processing emails
agenda.define('process email', async (job) => {
  // Extract email content and recipient's address from the job data
  const { content, recipientEmail } = job.attrs.data;

  // Categorize the email using OpenAI API
  const category = await categorizeEmail(content);

  // Sending an appropriate reply based on the category
  sendReply(category, recipientEmail); 
});

// Function to schedule email processing
async function scheduleEmailProcessing(content, recipientEmail) {
  await agenda.start();
  // Schedule the email processing job to run in 1 minute
  await agenda.schedule('in 1 minute', 'process email', { content, recipientEmail });
}

module.exports = { scheduleEmailProcessing };
