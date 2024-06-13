import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // This points to the views folder in the dist directory

// Define a simple route
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', message: 'Hello, world!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
