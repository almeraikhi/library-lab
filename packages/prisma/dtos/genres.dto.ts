import z from 'zod';

export const CreateGenreSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});

export type CreateGenreInput = z.infer<typeof CreateGenreSchema>;
