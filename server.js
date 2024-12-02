// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const { connectDB } = require('./config/db');
// const reminderRoutes = require('./routes/reminderRoutes');

// dotenv.config();

// console.log('Environment Variables:', process.env); // Logs all loaded environment variables

// connectDB();

// const app = express();

// app.use((req, res, next) => {
//     console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
//     next();
// });

// app.use(cors());
// app.use(express.json());

// app.use('/api/reminders', reminderRoutes); // Correctly mounts reminderRoutes at /api/reminders

// app.use((req, res) => {
//   res.status(404).json({ message: 'Endpoint not found' }); // Handles unmatched routes
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/db');

dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB

const app = express();

// Middleware!
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reminders', require('./routes/reminderRoutes'));

// Handle unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

