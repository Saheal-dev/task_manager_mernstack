// Import Mongoose and dotenv
const mongoose = require('mongoose');
require('dotenv').config(); // Ensure .env is loaded

// Connection function
const conn = async () => {
    try {
        const response = await mongoose.connect(`${process.env.MONGO_URI}`);

        if (response) {
            console.log('Database Connected');
        }
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

// Call the connection function
conn();
