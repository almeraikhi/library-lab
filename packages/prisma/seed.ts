import { parseArgs } from 'node:util';
import { prisma } from './';
import { authorsSeed } from 'data/authors.seed';
import { genresSeed } from 'data/genres.seed';
import { booksSeed } from 'data/books.seed';

async function main() {
  const {
    values: { environment },
  } = parseArgs({ options: { environment: { type: 'string' } } });

  await prisma.$transaction(async (tx) => {
    // Run production seeds here
  });

  switch (environment) {
    case 'development':
      // Run development seeds here
      await authorsSeed();
      await genresSeed();
      await booksSeed();
      break;
    default:
      break;
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
