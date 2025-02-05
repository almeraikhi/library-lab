import z from 'zod';

export const CreateBookSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  authorId: z.string(),
  genresIds: z.array(z.string()),
  ISBN: z.string(),
  publishedAt: z.date(),
});

export type CreateBookInput = z.infer<typeof CreateBookSchema>;
