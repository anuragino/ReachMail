const nodemailer = require('nodemailer');

const OPENAI_API_URL = 'https://api.openai.com/v1/completions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Function to classify the email content using OpenAI API
async function categorizeEmail(content) {
  try {
    // Making a POST request to OpenAI API to categorize the email content
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      // Using a predefined prompt to get the category from the model
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        prompt: `Classify this email: "${content}". Options: Interested, Not Interested, More Information.`,
        max_tokens: 10, 
      }),
    });

    const data = await response.json();
    
    // If API call is successful and we get a valid response, return the category
    if (response.ok && data.choices && data.choices.length > 0) {
      return data.choices[0].text.trim();
    } else {
      // If no valid response, throw an error to handle it gracefully
      throw new Error(data.error ? data.error.message : 'No valid response');
    }
  } catch (error) {
    // Log any errors that occur during the categorization process
    console.error('Error categorizing email:', error.message);
    return 'Unable to categorize'; // Fallback when API call fails
  }
}


// Function to send a reply using Nodemailer based on email category
function sendReply(category, recipientEmail) {
  //console.log('Email Username:', process.env.EMAIL_USERNAME); // Log email username if needed for debugging

  // Configure the nodemailer transport to use Gmail and authenticate using environment variables
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  let message = '';
  // Construct the email message based on the category of the email
  switch (category) {
    case 'Interested':
      message = 'Thank you for your interest! Are you available for a demo call?';
      break;
    case 'Not Interested':
      message = 'Thank you for your time. Please let us know if you change your mind.';
      break;
    case 'More Information':
      message = 'Here’s more information about our platform.';
      break;
    default:
      message = 'Thank you for reaching out.'; // Fallback for unknown categories
  }

  // Set up the mail options with sender, recipient, subject, and the constructed message
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: recipientEmail,
    subject: 'Automated Response from ReachInbox',
    text: message,
  };

  // Actually send the email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error); // Log error if sending fails
    } else {
      console.log('Email sent successfully:', info.response); // Log success message
    }
  });
}

// Export the functions to be used elsewhere
module.exports = { categorizeEmail, sendReply };
