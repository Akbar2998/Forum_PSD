const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const forumRouter = require('./routes/forum');
const createPostRouter = require('./routes/createpost'); // Add this line

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect('mongodb://127.0.0.1:27017/nyforum', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the MongoDB database');
  })
  .catch((error) => {
    console.error('Error connecting to the MongoDB database:', error);
  });

app.use('/api', registrationRouter);
app.use('/api', loginRouter);
app.use('/api', forumRouter);
app.use('/api', createPostRouter); // Add this line

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
