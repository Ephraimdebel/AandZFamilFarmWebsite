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

const allowedOrigins = [
  'http://localhost:5173',
  'https://anzfamilyfarm.com',
  'https://www.anzfamilyfarm.com'
];

app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin (like mobile apps or curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization']
}));


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