import { z } from 'zod';

export const MAX_NAME_LENGTH = 200;
export const MAX_EMAIL_LENGTH = 320;
export const MAX_MESSAGE_LENGTH = 10000;

const noNewlines = (value: string) => !/[\r\n]/.test(value);

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required.')
    .max(MAX_NAME_LENGTH, 'Name is too long.')
    .refine(noNewlines, 'Name must not contain newlines.'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .max(MAX_EMAIL_LENGTH, 'Email is too long.')
    .email('Email is invalid.')
    .refine(noNewlines, 'Email must not contain newlines.'),
  message: z
    .string()
    .trim()
    .min(1, 'Message is required.')
    .max(MAX_MESSAGE_LENGTH, 'Message is too long.'),
});

export type ContactPayload = z.infer<typeof contactSchema>;
