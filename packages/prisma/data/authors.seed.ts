import { prisma } from 'index';
import { authorsTransactions } from 'transactions/authors.transactions';

export const authors = {
  brandonSanderson: {
    id: 'cm6rj93m700033b6ixkzek31c',
    name: 'Brandon Sanderson',
  },
};

export const authorsSeed = async () => {
  await prisma.$transaction(async (tx) => {
    await authorsTransactions(tx).create({
      id: authors.brandonSanderson.id,
      name: authors.brandonSanderson.name,
    });
  });
};
