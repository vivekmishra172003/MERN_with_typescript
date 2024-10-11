import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import express, { Request, Response, Application } from 'express';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Initializing Prisma Client and Express Application
const prisma = new PrismaClient();
const app: Application = express();

// Setting up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));

// Middleware for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Render index page
app.get('/', (req: Request, res: Response): void => {
    res.render('index');
});

// User creation route
app.post('/create', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, age } = req.body;

    // Await bcrypt's genSalt to avoid callback issues
    const salt = await bcrypt.genSalt(10);  // Corrected: added `await`
    console.log(salt);

    // Await bcrypt's hash function to handle async properly
    const hash = await bcrypt.hash(password, salt);  // Corrected: added `await`
    console.log(hash);

    // Storing hashed password into database with Prisma
    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hash,  // Saving hashed password
        age: parseInt(age, 10)  // Corrected: parsing age to an integer
      }
    });

    // Signing JWT token and setting it in a cookie
    let token = jwt.sign({ email }, "secretkey");  // Signing token with a secret key
    res.cookie('token', token);  // Setting token as a cookie
    res.send(createdUser);  // Sending created user as response
  } catch (error) {
    // Handling potential errors
    res.status(500).send({ error: 'An error occurred while creating the user' });
  }
});

// Logout route to clear JWT token cookie
app.get('/logout', (req: Request, res: Response): void => {
  res.clearCookie('token');  // Clear token cookie on logout
  res.redirect('/');  // Redirect to home page
});

// Render login page
app.get('/login', (req: Request, res: Response): void => {
  res.render('login');
});

// Login route for authentication
app.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Checking if user exists in the database
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user) {
      res.status(400).send({ error: "User not found" });  // User not found error
      return;
    }

    // Compare hashed passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);  // Corrected: added `await`
    if (isPasswordCorrect) {
      res.send("Logged in successfully");
    } else {
      res.status(400).send({ error: "Invalid password" });  // Incorrect password error
    }
  } catch (err) {
    // Handling any server errors
    res.status(500).send({ error: "An error occurred while logging in" });
  }
});

// Server listening on port 3000
app.listen(3000, () => 
  console.log('Server is running on http://localhost:3000')
);
