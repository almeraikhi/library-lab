import { faker } from '@faker-js/faker';
import { prisma } from 'index';
import { booksTransactions } from 'transactions/books.transactions';

export const booksSeed = async () => {
  await prisma.$transaction(async (tx) => {
    const authors = await tx.author.findMany();
    const genres = await tx.genre.findMany();

    const promises = Array.from({ length: 10 }, () => {
      const author = authors[Math.floor(Math.random() * authors.length)];
      const genre = genres[Math.floor(Math.random() * genres.length)];
      if (!author || !genre) {
        throw new Error('Author or genre not found');
      }

      return booksTransactions(tx).create({
        title: faker.lorem.words(3),
        authorId: author.id,
        genresIds: [genre.id],
        ISBN: faker.string.numeric(13),
        publishedAt: faker.date.past(),
      });
    });

    await Promise.all(promises);
  });
};
