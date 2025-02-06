import express, { Request, Response, Router } from 'express';
import { prisma } from '@repo/prisma';
import { booksTransactions } from '@repo/prisma/transactions/books.transactions';
import { ApiError } from '@repo/prisma/utils/ApiError';
import { validateResource } from '../utils/validateResource';
import {
  CreateBookSchema,
  GetBookByIdSchema,
  UpdateBookParamsSchema,
} from '@repo/prisma/dtos/books.dto';
const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const books = await prisma.$transaction(async (tx) => {
    return booksTransactions(tx).getAll({ params: req.query });
  });
  res.json(books);
});

router.get('/count', async (req: Request, res: Response) => {
  const count = await prisma.$transaction(async (tx) => {
    return booksTransactions(tx).count({ params: req.query });
  });
  res.json(count);
});

router.get(
  '/:id',
  validateResource(GetBookByIdSchema, 'params'),
  async (req: Request, res: Response) => {
    const book = await prisma.$transaction(async (tx) => {
      return booksTransactions(tx).getById(req.params as any);
    });
    res.json(book);
  }
);

router.get(
  '/:id/logs',
  validateResource(GetBookByIdSchema, 'params'),
  async (req: Request, res: Response) => {
    const book = await prisma.$transaction(async (tx) => {
      return booksTransactions(tx).getLogs(req.params as any);
    });
    res.json(book);
  }
);

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

router.put(
  '/:id',
  validateResource(UpdateBookParamsSchema, 'params'),
  validateResource(CreateBookSchema, 'body'),
  async (req: Request, res: Response) => {
    const updateObject = { ...req.body, id: req.params.id };
    const book = await prisma.$transaction(async (tx) => {
      return booksTransactions(tx).update(updateObject);
    });
    res.json(book);
  }
);

export default router;
