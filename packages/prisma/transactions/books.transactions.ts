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
    update: async (input: CreateBookInput) => {
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

      const existingRecord = await tx.book.findFirst({
        where: {
          id: input.id,
        },
        include: {
          genres: {
            select: {
              genreId: true,
            },
          },
        },
      });

      // Create the book since all genre IDs are valid
      const book = await tx.book.update({
        where: {
          id: input.id,
        },
        data: {
          genres: {
            deleteMany: {},
            create: input.genresIds.map((id) => ({
              genreId: id,
            })),
          },
          author: {
            connect: { id: input.authorId },
          },
          title: input.title,
          ISBN: input.ISBN,
          publishedAt: new Date(input.publishedAt),
        },
      });

      const booksWithSameDuplicateIdentifier = await tx.book.count({
        where: {
          title: {
            equals: input.title,
            mode: 'insensitive',
          },
          authorId: input.authorId,
          ISBN: input.ISBN,
        },
      });

      // if there are more than 1 book with those unique identifiers,
      // then it means the operation we performed caused a duplicate book
      if (booksWithSameDuplicateIdentifier > 1) {
        // throwing the error will undo the transaction, thus the book will not be upserted
        throw new ApiError('Book already exists', 'BOOK_ALREADY_EXISTS', 409);
      }

      if (existingRecord) {
        await tx.bookUpdateLog.create({
          data: {
            bookId: existingRecord.id,
            oldData: existingRecord,
            newData: book,
          },
        });
      }
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

    count: async (args: GetAllArgs) => {
      const { params } = args;
      const { authorId, genresIds } = params;

      const count = await tx.book.count({
        where: { authorId, genres: { some: { genreId: { in: genresIds } } } },
      });

      return { count };
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

    getLogs: async ({ id }: GetBookByIdInput) => {
      return tx.bookUpdateLog.findMany({
        where: { bookId: id },
        orderBy: { createdAt: 'desc' },
      });
    },
  };
};
