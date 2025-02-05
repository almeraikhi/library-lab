import express, { Request, Response, Router } from 'express';
import { prisma } from '@repo/prisma';
import { booksTransactions } from '@repo/prisma/transactions/books.transactions';

const router: Router = express.Router();

// GET /sample - Retrieve the to-do list
router.get('/', async (req: Request, res: Response) => {
  const books = await prisma.$transaction(async (tx) => {
    return booksTransactions(tx).getAll();
  });
  res.json(books);
});

export default router;
