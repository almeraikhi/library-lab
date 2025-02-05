import { prisma } from 'index';
import { genresTransactions } from 'transactions/genres.transactions';

export const genres = {
  scienceFiction: {
    id: 'cm6rjbjpv00073b6iqbuxyr76',
    name: 'Science Fiction',
  },
  fantasy: {
    id: 'cm6rjcgka000a3b6ik9snxvp3',
    name: 'Fantasy',
  },
  youngAdult: {
    id: 'cm6rjck50000e3b6i6j90rwke',
    name: 'Young Adult',
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
