import z from 'zod';

export const CreateBookSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  authorId: z.string().min(1, 'Author is required'),
  genresIds: z.array(z.string()).min(1, 'At least one genre is required'),
  ISBN: z.string().min(13, 'ISBN is required'),
  publishedAt: z.preprocess(
    (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
    z.date().min(new Date('1440-01-01'), 'Published at is required')
  ),
});

export type CreateBookInput = z.infer<typeof CreateBookSchema>;

export const GetBookByIdSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export type GetBookByIdInput = z.infer<typeof GetBookByIdSchema>;

export const UpdateBookParamsSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export type UpdateBookParamsInput = z.infer<typeof UpdateBookParamsSchema>;
