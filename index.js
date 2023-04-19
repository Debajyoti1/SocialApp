// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express'); // Web framework for Node.js
const dotenv = require('dotenv'); // Loads environment variables from a .env file
const mongoose = require('./config/mongoose'); // MongoDB config file is called to initiate DB connection


// Create an instance of the Express application
const app = express();

// Use middleware to parse incoming requests
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Serve static files from the 'assets' directory
app.use(express.static('./assets'));

// Set the view engine to 'ejs' and specify the directory for views
app.set('view engine', 'ejs');
app.set('views', './views');

// Import and use routes defined in separate modules
app.use('/', require('./routes'));

// Start the server
const port = process.env.PORT || 8000; // Use the port defined in the environment variable, or default to port 8000
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});