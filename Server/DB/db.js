// db.js
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://babaji:babaji@asapproject.edzdy13.mongodb.net/?retryWrites=true&w=majority&appName=AsapProject'

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);  // Exit on fail
    }
};

module.exports = connectDB;
