import { z } from 'zod';

export const pushNotificationSchema = z.object({
  category: z.enum(['Alerts', 'Discover'], {
    message: 'Please select a push category',
  }),
  title: z
    .string()
    .min(1, { message: 'Notification title is required' })
    .min(5, { message: 'Title must be at least 5 characters' }),
  message: z
    .string()
    .min(1, { message: 'Push notification message is required' })
    .min(10, { message: 'Message must be at least 10 characters' }),
});

export type PushNotificationFormValues = z.infer<typeof pushNotificationSchema>;
