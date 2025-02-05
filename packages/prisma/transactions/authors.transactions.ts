import { Prisma } from '@repo/prisma';
import { CreateAuthorInput } from '../dtos/authors.dto';

export const authorsTransactions = (tx: Prisma.TransactionClient) => {
  return {
    create: async (input: CreateAuthorInput) => {
      const author = await tx.author.create({
        data: input,
      });

      return author;
    },

    getAll: async () => {
      const authors = await tx.author.findMany();
      return authors;
    },
  };
};
