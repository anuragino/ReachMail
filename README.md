# ReachInbox Email Automation Tool
This backend tool automates the process of parsing, categorizing, and responding to emails from Google and Outlook accounts based on their content.
The tool utilizes OAuth for secure email access, OpenAI for understanding the context of emails, and Nodemailer for sending automatic replies.
It is built using Node.js, Express.js, and MongoDB with Agenda.js for task scheduling.

## 🌟 Features
- **OAuth Integration:**
  - Connect Gmail and Outlook accounts securely using OAuth2.

- **Email Parsing and Categorization:**
  - Retrieve emails from the connected accounts and use OpenAI to categorize them into: Interested, Not Interested, More Information


- **Automatic Replies:**
  - Based on the category, the tool automatically generates and sends an appropriate reply:
        - Interested: Suggest a demo call.
        - Not Interested: Thank them for their time.
        - More Information: Provide additional details about the service.

- **Task Scheduling:** 
    - The tool uses Agenda.js to schedule tasks for processing emails in the background.

## 🚦 Setup Instructions

1. **Clone the repository:** git clone `https://github.com/anuragino/ReachInbox.git`
2. **Install dependencies:**
    `cd reachinbox-backend`
    `npm install`
3. **Set up environment variables:** Sample given in .env.sample file
4. **Run MongoDB:** If you're using a local MongoDB, ensure it is running `mongodb`
5. **Start the server:** `node server.js`
6. **Test the tool:** Use Postman or any API client to send a POST request to http://localhost:5000/api/send-email or https://reachmail.vercel.app/api/send-email with email content and recipient details.


## Dependencies

1. **Express.js:** For creating the server and handling routes.
2. **Axios or Fetch:** For making HTTP requests to the OpenAI API.
3. **Nodemailer:** For sending email replies.
4. **Agenda.js:** For task scheduling (based on MongoDB).
5. **OAuth libraries:** For connecting to Gmail and Outlook accounts.

## Things I Learned While Making This Project

- OAuth2 integration with Google and Outlook requires careful setup, especially around redirect URIs and scopes.
- Using OpenAI to dynamically categorize email content was a great introduction to working with AI-powered APIs.
- Task scheduling with Agenda.js and MongoDB provided hands-on experience with asynchronous job processing.
- Debugging issues related to API requests and email sending taught me how to handle asynchronous flows effectively.


