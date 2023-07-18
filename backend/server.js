
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Define your MongoDB connection URI
const mongoURI = 'mongodb+srv://anuragkashyap026:9KIMG3vijrQGZlUE@cluster0.9ohqljv.mongodb.net/';

// Define your Mongoose model
const startupChallengeSchema = new mongoose.Schema({
  'S. No.': { type: Number, required: true },
  'Challenge Category': { type: String, required: true },
  'Winner Category(DISC/ OC/ Prime)': { type: String },
  'Startup Name': { type: String, required: true },
  'Partner Incubator': { type: String },
  'Contract owner': { type: String },
  'Challenge Name': { type: String },
  'Nodal Agency': { type: String },
  'City/District': { type: String },
  'State': { type: String },
  'Address': { type: String },
  'Technology Keywords': { type: String },
  'Technology Domain': { type: String },
  'Contact Email': { type: String },
  'Logo': { type: String },
  'Website Link': { type: String },
  'Technology Domain.1': { type: String },
  'Startup Brief': { type: String },
  'Status of Project': { type: String },
});

const StartupChallenge = mongoose.model('StartupChallenge', startupChallengeSchema);

// Enable CORS
app.use(cors());

// Establish the MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });

// Define a route to handle the search
app.get('/search', async (req, res) => {
  const startupName = req.query.name; // Retrieve the startup name from the query string

  try {
    // Perform the search based on the startup name
    const startups = await StartupChallenge.find({ 'Startup Name': { $regex: startupName, $options: 'i' } });

    // Return the results as JSON
    res.json(startups);
  } catch (error) {
    console.error('Error searching data:', error);
    res.status(500).json({ error: 'An error occurred while searching data' });
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
