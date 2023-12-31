const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;


app.use(cors());
app.use(express.json());

// MongoDB connection
const DB = process.env.DATABASE

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log("DataBase Connected")).catch((err)=>{
    console.log(err);
})

const surveySchema = new mongoose.Schema({
  name: String,
  gender: String,
  nationality: String,
  email: String,
  phone: String,
  address: String,
  message: String,
});

const Survey = mongoose.model('Survey', surveySchema);

// API endpoints
app.post('/api/submit', async (req, res) => {
  const surveyData = req.body;
  try {
    const newSurvey = new Survey(surveyData);
    await newSurvey.save();
    res.status(201).json({ message: 'Survey submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/surveys', async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).json(surveys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
