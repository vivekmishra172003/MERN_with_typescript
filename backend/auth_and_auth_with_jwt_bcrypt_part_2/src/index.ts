import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import userModel from './models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const port: number = Number(process.env.PORT) || 3000;
const app: Application = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define the types for request bodies
interface CreateUserRequestBody {
    username: string;
    email: string;
    password: string;
    age: number;
}

interface LoginRequestBody {
    email: string;
    password: string;
}

// routes
app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

app.post('/create', async (req: Request<{}, {}, CreateUserRequestBody>, res: Response) => { // Specify the type for req.body
    let { username, email, password, age } = req.body;
    try {
        const salt = await bcrypt.genSalt(10); // Used async/await for bcrypt.genSalt
        const hash = await bcrypt.hash(password, salt); // Used async/await for bcrypt.hash
        let createdUser = await userModel.create({
            username,
            email,
            password: hash,
            age
        });
        let token = jwt.sign({ email }, "secret");
        res.cookie("token", token);
        res.status(201).send(createdUser);
    } catch (err) {
        res.status(500).send("Server error");
    }
});

app.get("/logout", (req: Request, res: Response) => {
    res.cookie("token", "");
    res.redirect("/");
});

app.get("/login", (req: Request, res: Response) => {
    res.render('login');
});

app.post("/login", async (req: Request<{}, {}, LoginRequestBody>, res: Response) => { // Specify the type for req.body
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.send("Something went wrong");

    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) return res.status(500).send("Server error"); // Added error handling
        if (result) {
            let token = jwt.sign({ email: user.email }, "secret");
            res.cookie("token", token);
            res.send("Login successful");
        } else {
            res.send("Invalid credentials");
        }
    });
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
