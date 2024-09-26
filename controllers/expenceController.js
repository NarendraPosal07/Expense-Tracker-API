const Expense = require('../models/expenceModel');
const csv = require('csv-parser');
const fs = require('fs');

const addExpense = async (req, res) => {
    try {
        let expenses;
        if (req.file) {
            const results = [];
            fs.createReadStream(req.file.path)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                    expenses = await Expense.insertMany(results);
                    res.status(201).json(expenses);
                });
        } else {
            const expense = new Expense(req.body);
            await expense.save();
            res.status(201).json(expense);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getExpenses = async (req, res) => {
    try {
        const { category, dateFrom, dateTo, paymentMethod, sortBy, page = 1, limit = 10 } = req.query;

        const query = {};
        if (category) query.category = category;
        if (paymentMethod) query.paymentMethod = paymentMethod;
        if (dateFrom || dateTo) query.date = { $gte: dateFrom, $lte: dateTo };

        const expenses = await Expense.find(query)
            .sort(sortBy)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const result = await Expense.deleteMany({ _id: { $in: req.body.ids } });
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { addExpense, getExpenses, updateExpense, deleteExpense };
