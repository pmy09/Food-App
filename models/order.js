const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  user: {
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      ref: 'User'
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  date: {
    type: String,
    required: true
  },
  delivered: {
    type: Boolean,
    required: true
  },
  // payment: {
  //   type: String,
  //   required: true
  // }
});

module.exports = mongoose.model('Order', orderSchema);
