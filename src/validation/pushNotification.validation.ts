import { z } from 'zod';

export const pushNotificationSchema = z.object({
  category: z.string().min(1, { message: 'Please select a push category' }),
  title: z
    .string()
    .min(1, { message: 'Notification title is required' })
    .min(2, { message: 'Title must be at least 2 characters' }),
  content: z
    .string()
    .min(1, { message: 'Push notification message content is required' }),
});

export type PushNotificationFormValues = z.infer<typeof pushNotificationSchema>;
