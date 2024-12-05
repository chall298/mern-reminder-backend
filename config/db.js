// const dotenv = require('dotenv');
// dotenv.config();

// console.log('MONGO_URI:', process.env.MONGO_URI);

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.MONGO_URI; // Use .env for the connection string

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
//   connectTimeoutMS: 20000, // 20 seconds
//   socketTimeoutMS: 45000, // 45 seconds
// });

// const connectDB = async () => {
//   try {
//     console.log('Connecting to MongoDB...');
//     await client.connect();
//     console.log('MongoDB connected successfully!');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1);
//   }
// };

// module.exports = { connectDB, client };


// ========================================================================
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// const uri = process.env.MONGO_URI;

// if (!uri) {
//   throw new Error('MONGO_URI is not defined in the .env file');
// }

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// const connectDB = async () => {
//   try {
//     console.log('Connecting to MongoDB...');
//     await client.connect();const mongoose = require('mongoose');


//     console.log('MongoDB connected successfully!');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1); // Exit the process on failure
//   }
// };

// module.exports = { connectDB, client };

// working version for sure

// ================================================================================

const mongoose = require('mongoose'); // Import mongoose for MongoDB interactions

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from .env
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,        // Use the new MongoDB connection string parser
      useUnifiedTopology: true,    // Use the unified topology engine for MongoDB driver
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    // Log error and exit process if connection fails
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// module.exports = { connectDB }; // Export the connection function

module.exports = connectDB;

