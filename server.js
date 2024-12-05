


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const { connectDB } = require('./config/db');
const connectDB = require('./config/db');//**
const reminderRoutes = require('./routes/reminderRoutes');//**
const userRoutes = require('./routes/userRoutes');//import the user route**
const errorHandler = require('./middleware/errorMiddleware');//**


dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB

const app = express();

// Middleware!
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/reminders', require('./routes/reminderRoutes'));
app.use('/api/reminders', reminderRoutes);//register the reminder route**
app.use('/api/users', userRoutes);//register the user route**

app.use(errorHandler);//**

// Handle unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

