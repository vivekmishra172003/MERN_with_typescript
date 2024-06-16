/*
Task:build a shortner url
1.takes in vaild url and returns a shortened url
2.keep track of total visit/clicks on the url
3. routes
post/url-generate a new short url and return the shotend url 
GET/:id redirects the user to the original url
get /url/analytics/:id - Returns the clicks for the provided short id
 */ 

import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

import connectToMongoDB from './connect';
import URL from './models/url';
import path from 'path';

// all routes
import staticRoute from './routes/staticRouter';
import urlRoute from './routes/url';
import userRoute from './routes/user'
// Load environment variables
dotenv.config(); // Moved to the top to ensure environment variables are available early



// Connect to MongoDB
connectToMongoDB(process.env.MONGO_URI!)
  .then(() => { console.log("Mongodb connected"); })
  .catch(err => { console.error("Failed to connect to MongoDB", err); }); // Added error handling for MongoDB connection

const app: Application = express();

// Set view engine and views directory
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Route to render home page with URLs


// Route for URL operations
app.use('/url', urlRoute);
app.use('/',staticRoute)
app.use('/user',userRoute)

// Start the server
app.listen(process.env.PORT!, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
