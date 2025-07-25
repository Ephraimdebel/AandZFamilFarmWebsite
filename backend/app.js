// Import the express module 
const express = require('express');
// Import the dotenv module and call the config method to load the environment variables
require('dotenv').config();
// Import the sanitizer module 
const sanitize = require('sanitize');
// Import the CORS module 
const cors = require('cors');
// Set up the CORS options to allow requests from our front-end 
// const corsOptions = {
//   origin: process.env.FRONTEND_URL,
//   optionsSuccessStatus: 200
// };
// Create a variable to hold our port number 
const port = process.env.PORT;
// Import the router 
const router = require('./routes');
// Create the webserver 
const app = express();

const path = require('path');

// Add the CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Add the express.json middleware to the application
app.use(express.json());
// Add the sanitizer to the express middleware 
app.use(sanitize.middleware);
// Add the routes to the application as middleware 
// Serve images in the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(router);
// Start the webserver
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
// Export the webserver for use in the application 
module.exports = app;