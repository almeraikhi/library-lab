import { prisma } from '@repo/prisma';
import { authorsTransactions } from '@repo/prisma/transactions/authors.transactions';
import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

// GET /sample - Retrieve the to-do list
router.get('/', async (req: Request, res: Response) => {
  const authors = await prisma.$transaction(async (tx) => {
    return authorsTransactions(tx).getAll();
  });
  res.json(authors);
});

export default router;
