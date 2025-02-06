import { prisma } from 'index';
import { genresTransactions } from 'transactions/genres.transactions';
import { createId } from '@paralleldrive/cuid2';

export const genres = {
  scienceFiction: {
    id: createId(),
    name: 'Science Fiction',
  },
  fantasy: {
    id: createId(),
    name: 'Fantasy',
  },
  youngAdult: {
    id: createId(),
    name: 'Young Adult',
  },
  art: {
    id: createId(),
    name: 'Art',
  },
  history: {
    id: createId(),
    name: 'History',
  },
  romance: {
    id: createId(),
    name: 'Romance',
  },
  mystery: {
    id: createId(),
    name: 'Mystery',
  },
  horror: {
    id: createId(),
    name: 'Horror',
  },
  thriller: {
    id: createId(),
    name: 'Thriller',
  },
  biography: {
    id: createId(),
    name: 'Biography',
  },
  autobiography: {
    id: createId(),
    name: 'Autobiography',
  },
  memoir: {
    id: createId(),
    name: 'Memoir',
  },
  selfHelp: {
    id: createId(),
    name: 'Self Help',
  },
  travel: {
    id: createId(),
    name: 'Travel',
  },
};

export const genresSeed = async () => {
  await prisma.$transaction(async (tx) => {
    const promises = Object.values(genres).map((genre) => {
      return genresTransactions(tx).create({
        id: genre.id,
        name: genre.name,
      });
    });

    await Promise.all(promises);
  });
};
