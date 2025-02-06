import express, { Request, Response, Router } from 'express';
import { prisma } from '@repo/prisma';
import { genresTransactions } from '@repo/prisma/transactions/genres.transactions';

const router: Router = express.Router();

// GET /sample - Retrieve the to-do list
router.get('/', async (req: Request, res: Response) => {
  const genres = await prisma.$transaction(async (tx) => {
    return genresTransactions(tx).getAll();
  });
  res.json(genres);
});

export default router;
