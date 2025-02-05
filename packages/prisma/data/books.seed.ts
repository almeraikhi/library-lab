import { faker } from '@faker-js/faker';
import { prisma } from 'index';
import { booksTransactions } from 'transactions/books.transactions';

export const booksSeed = async () => {
  await prisma.$transaction(async (tx) => {
    const authors = await tx.author.findMany();
    const genres = await tx.genre.findMany();

    // create a random amount of books for each author.
    const promises = authors
      .map((author) => {
        const amount = faker.number.int({ min: 1, max: 10 });

        const promises = Array.from({ length: amount }, () => {
          // select a random genere
          const genre = genres[Math.floor(Math.random() * genres.length)];
          if (!genre) {
            throw new Error('Genre not found');
          }

          // return the transaction
          return booksTransactions(tx).create({
            title: faker.lorem.words(3),
            authorId: author.id,
            genresIds: [genre.id],
            ISBN: faker.string.numeric(13),
            publishedAt: faker.date.past(),
          });
        });

        return promises;
      })
      .flat();

    await Promise.all(promises);
  });
};
