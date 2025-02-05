import { CreateBookInput } from 'dtos/books.dto';
import { prisma } from 'index';
import { booksTransactions } from 'transactions/books.transactions';
import { authors } from './authors.seed';
import { genres } from './genres.seed';

export const books: Record<string, CreateBookInput> = {
  book1: {
    id: 'cm6rjbjpv00073b6iqbuxyr76',
    title: 'Mistborn: The Final Empire',
    authorId: authors.brandonSanderson.id,
    genresIds: [genres.scienceFiction.id, genres.fantasy.id],
    ISBN: '9780765311788',
    publishedAt: new Date('2006-11-14'),
  },
  book2: {
    id: 'cm6rjcgka000a3b6ik9snxvp3',
    title: 'Elantris',
    authorId: authors.brandonSanderson.id,
    genresIds: [genres.scienceFiction.id, genres.fantasy.id],
    ISBN: '9780765311788',
    publishedAt: new Date('2005-11-14'),
  },
  book3: {
    id: 'cm6rjck50000e3b6i6j90rwke',
    title: 'The Way of Kings',
    authorId: authors.brandonSanderson.id,
    genresIds: [genres.scienceFiction.id, genres.fantasy.id],
    ISBN: '9780765311788',
    publishedAt: new Date('2010-08-31'),
  },
};

export const booksSeed = async () => {
  await prisma.$transaction(async (tx) => {
    const promises = Object.values(books).map((book) => {
      return booksTransactions(tx).create(book);
    });

    await Promise.all(promises);
  });
};
