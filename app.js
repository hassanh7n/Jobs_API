
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const jobs = require('./routes/jobs')
require('dotenv').config({path : './config/config.env'})
const UserAuthentication = require('./middleware/authentication');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const User = require('./routes/auth')

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/jobs', UserAuthentication, jobs)
app.use('/api/v1/User', User)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    //await EventsSchema.create(EventsData);
    //await BlogsSchema.create(BlogsData);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
