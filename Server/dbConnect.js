// dbConnect.js
const mongoose = require('mongoose');

const uri = 'mongodb+srv://babaji:babaji@asapproject.edzdy13.mongodb.net/?retryWrites=true&w=majority&appName=AsapProject' ;

// Define Product schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String
});

// Create Product model
const Product = mongoose.model('Product', productSchema);

async function connectDB() {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
}

module.exports = { connectDB, Product };
