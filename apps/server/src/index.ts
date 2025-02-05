import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { env } from '../env';
import sampleRouter from './routes/sample.router';
import booksRouter from './routes/books.router';
import authorsRouter from './routes/authors.router';
import genresRouter from './routes/genres.router';

const app: Application = express();

app.set('trust proxy', true);
app.use(
  cors({
    origin: [env.APP_URL],
    credentials: true, // Allow credentials
  })
);
app.use(express.json());

app.use('/sample', sampleRouter);
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/genres', genresRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API');
});

const server = app.listen(env.PORT, async () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});

// Add this block to handle termination signals
process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing server...');
  await server.close(); // Close the server
  console.log('Server closed. Exiting process.');
  process.exit(0); // Exit the process
});
