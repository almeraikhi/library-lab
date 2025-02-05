import { parseArgs } from 'node:util';
import { prisma } from './';

async function main() {
  const {
    values: { environment },
  } = parseArgs({ options: { environment: { type: 'string' } } });

  await prisma.$transaction(async (tx) => {
    // TODO: run production seeds here
  });

  switch (environment) {
    case 'development':
      // TODO: Run development seeds here
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
