const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const couponSchema = new Schema({});

module.exports = mongoose.model('Coupon', couponSchema);