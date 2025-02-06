import z from 'zod';

export const CreateAuthorSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});

export type CreateAuthorInput = z.infer<typeof CreateAuthorSchema>;
