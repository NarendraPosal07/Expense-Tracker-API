const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['cash', 'credit'], required: true },
    date: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

module.exports = mongoose.model('Expense', expenseSchema);
