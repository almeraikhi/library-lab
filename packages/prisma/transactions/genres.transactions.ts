import { Prisma } from '@repo/prisma';
import { CreateGenreInput } from 'dtos/genres.dto';

export const genresTransactions = (tx: Prisma.TransactionClient) => {
  return {
    create: async (input: CreateGenreInput) => {
      const genre = await tx.genre.create({
        data: input,
      });

      return genre;
    },
    getAll: async () => {
      return tx.genre.findMany();
    },
  };
};
