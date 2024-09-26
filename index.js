const express = require('express');
const connectDB = require('./db/db');
const expenseRoutes = require('./routes/expenceRoute');
const userRoutes = require('./routes/userRoute');
const PORT = process.env.PORT || 7000
require('dotenv').config();

const app = express();
app.use('/uploads', express.static('uploads'));

app.use(express.json());
connectDB

app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);


app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
