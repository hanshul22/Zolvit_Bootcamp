// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://babaji:babaji@asapproject.edzdy13.mongodb.net/?retryWrites=true&w=majority&appName=AsapProject';
        
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);  // Exit on fail
    }
};

module.exports = connectDB;
