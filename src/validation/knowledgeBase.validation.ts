import { z } from 'zod';

export const uploadKnowledgeDocumentSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Document title is required' })
    .min(3, { message: 'Document title must be at least 3 characters' }),
  format: z.enum(['PDF', 'WORD', 'MD'], {
    message: 'Please select a document format',
  }),
  content: z
    .string()
    .min(1, { message: 'Knowledge text content is required' }),
});

export type UploadKnowledgeDocumentFormValues = z.infer<typeof uploadKnowledgeDocumentSchema>;
