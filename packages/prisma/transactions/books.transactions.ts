import { Prisma } from '@repo/prisma';
import {
  CreateBookInput,
  GetBookByIdInput,
  GetBookByIdSchema,
} from '../dtos/books.dto';
import { ApiError } from 'utils/ApiError';
import { ZodError } from 'zod';

interface PaginationParams {
  page?: number;
  limit?: number;
}

export type GetAllBooksParams = PaginationParams & {
  authorId?: string;
  genresIds?: string[];
};

export type GetAllArgs = {
  params: GetAllBooksParams;
};

export const booksTransactions = (tx: Prisma.TransactionClient) => {
  return {
    create: async (input: CreateBookInput) => {
      const bookExists = await tx.book.findFirst({
        where: {
          title: {
            equals: input.title,
            mode: 'insensitive',
          },
          authorId: input.authorId,
          ISBN: input.ISBN,
        },
      });

      if (bookExists) {
        throw new ApiError('Book already exists', 'BOOK_ALREADY_EXISTS', 409);
      }

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

    getAll: async (args: GetAllArgs) => {
      const { params } = args;
      const {
        page = 1,
        limit = 10,
        authorId = undefined,
        genresIds = undefined,
      } = params;
      const validatedLimit = Math.min(Math.max(limit, 10), 100);
      const skip = (page - 1) * validatedLimit;

      return tx.book.findMany({
        where: {
          authorId: authorId,
          genres: {
            some: {
              genreId: { in: genresIds },
            },
          },
        },
        skip,
        take: validatedLimit,
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

    getById: async ({ id }: GetBookByIdInput) => {
      try {
        console.log('getting book by id', id);
        const input = GetBookByIdSchema.parse({ id });

        return tx.book.findUnique({
          where: { id: input.id },
          include: {
            genres: {
              include: {
                genre: true,
              },
            },
            author: true,
          },
        });
      } catch (error) {
        if (error instanceof ZodError) {
          throw new ApiError(error.message, 'INVALID_INPUT', 400);
        }
        throw error;
      }
    },
  };
};
