import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;  // Added a fallback port

const app: Application = express();

interface Joke {
  id: number;
  title: string;
  content: string;
}

app.get('/api/jokes', (req: Request, res: Response) => {
  const jokes: Joke[] = [
    {
      id: 1,
      title: 'A joke',
      content: 'This is joke'
    },
    {
      id: 2,
      title: 'A second joke',
      content: 'This is second joke'
    },
    {
      id: 3,
      title: 'A third joke',
      content: 'This is third joke'
    },
    {
      id: 4,
      title: 'A fourth joke',
      content: 'This is fourth joke'
    },
    {
      id: 5,
      title: 'Another joke',
      content: 'This is another joke'
    },
  ];
  res.send(jokes);
});

app.listen(port, () => {
  console.log(`Server at port ${port}`);
});
