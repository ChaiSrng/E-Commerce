const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    priceInRs:Number,
    category:String,
    company:String,
    userId:String
});

module.exports = mongoose.model("products",productSchema);