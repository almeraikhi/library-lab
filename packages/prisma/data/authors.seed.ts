import { prisma } from 'index';
import { authorsTransactions } from 'transactions/authors.transactions';
import { faker } from '@faker-js/faker';
import { createId } from '@paralleldrive/cuid2';

const generateRandomAuthor = () => {
  return {
    id: createId(),
    name: faker.person.fullName(),
  };
};

export const authors = Array.from({ length: 15 }, generateRandomAuthor);

export const authorsSeed = async () => {
  await prisma.$transaction(async (tx) => {
    const promises = authors.map((author) => {
      return authorsTransactions(tx).create({
        id: author.id,
        name: author.name,
      });
    });
    await Promise.all(promises);
  });
};
