import { z } from 'zod';

export const uploadKnowledgeDocumentSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Document title is required' })
    .min(2, { message: 'Document title must be at least 2 characters' }),
  content: z
    .string()
    .min(1, { message: 'Knowledge text content is required' }),
});

export type UploadKnowledgeDocumentFormValues = z.infer<typeof uploadKnowledgeDocumentSchema>;
