import express, { Request, Response, Router } from 'express';
import { prisma } from '@repo/prisma';
import { booksTransactions } from '@repo/prisma/transactions/books.transactions';
import { ApiError } from '@repo/prisma/utils/ApiError';
import { validateResource } from '../utils/validateResource';
import { GetBookByIdSchema } from '@repo/prisma/dtos/books.dto';
const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const books = await prisma.$transaction(async (tx) => {
    return booksTransactions(tx).getAll({ params: req.query });
  });
  res.json(books);
});

router.post('/', async (req: Request, res: Response) => {
  const { title, authorId, genresIds, ISBN, publishedAt } = req.body;
  try {
    const book = await prisma.$transaction(async (tx) => {
      return booksTransactions(tx).create({
        title,
        authorId,
        genresIds,
        ISBN,
        publishedAt,
      });
    });
    res.json(book);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.get(
  '/:id',
  validateResource(GetBookByIdSchema, 'params'),
  async (req: Request, res: Response) => {
    const book = await booksTransactions(prisma).getById(req.params as any);
    res.json(book);
  }
);

export default router;
