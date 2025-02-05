import { Prisma } from '@repo/prisma';
import { CreateBookInput } from '../dtos/books.dto';

export const booksTransactions = (tx: Prisma.TransactionClient) => {
  return {
    create: async (input: CreateBookInput) => {
      // Validate genre IDs
      const existingGenres = await tx.genre.findMany({
        where: { id: { in: input.genresIds } },
        select: { id: true },
      });

      const existingGenreIds = existingGenres.map((g) => g.id);
      const missingGenreIds = input.genresIds.filter(
        (id) => !existingGenreIds.includes(id)
      );

      if (missingGenreIds.length > 0) {
        throw new Error(
          `Genres not found for IDs: ${missingGenreIds.join(', ')}`
        );
      }

      // Create the book since all genre IDs are valid
      const book = await tx.book.create({
        data: {
          genres: {
            create: input.genresIds.map((id) => ({
              genreId: id,
            })),
          },
          author: {
            connect: { id: input.authorId },
          },
          title: input.title,
          ISBN: input.ISBN,
          publishedAt: input.publishedAt,
        },
      });

      return book;
    },

    getAll: async () => {
      return tx.book.findMany({
        include: {
          genres: {
            include: {
              genre: true,
            },
          },
          author: true,
        },
      });
    },
  };
};
