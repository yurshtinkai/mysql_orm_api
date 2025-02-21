const express = require('express'); 
const cors = require('cors');
const errorHandler = require('./_middleware/error-handler'); // Ensure this file 


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API Routes
app.use('/users', require('./users/user.controller'));

// Global Error Handler
app.use(errorHandler);

// Start Server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));