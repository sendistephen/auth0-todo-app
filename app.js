const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// connect to the database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection successfull'))
  .catch((err) => console.log(err));

// middleware
app.use(helmet());
app.use(express.json());
app.use(cors());

app.use('/api/v1/todos', require('./routes/todos'));

// listen to port
const PORT = 9000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
