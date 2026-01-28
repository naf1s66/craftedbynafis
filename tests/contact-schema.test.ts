import { describe, expect, it } from 'vitest';
import {
  contactSchema,
  MAX_EMAIL_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
} from '../app/api/contact/contact-schema';

const buildString = (length: number) => 'a'.repeat(length);

describe('contactSchema', () => {
  it('accepts a valid payload', () => {
    const result = contactSchema.safeParse({
      name: 'Nafis',
      email: 'nafis@example.com',
      message: 'Hello from the portfolio.',
    });

    expect(result.success).toBe(true);
  });

  it('rejects names that are too long', () => {
    const result = contactSchema.safeParse({
      name: buildString(MAX_NAME_LENGTH + 1),
      email: 'nafis@example.com',
      message: 'Hello',
    });

    expect(result.success).toBe(false);
  });

  it('rejects emails with newlines', () => {
    const result = contactSchema.safeParse({
      name: 'Nafis',
      email: 'nafis@example.com\nbcc:test@example.com',
      message: 'Hello',
    });

    expect(result.success).toBe(false);
  });

  it('rejects invalid email formats', () => {
    const result = contactSchema.safeParse({
      name: 'Nafis',
      email: 'not-an-email',
      message: 'Hello',
    });

    expect(result.success).toBe(false);
  });

  it('rejects messages that are too long', () => {
    const result = contactSchema.safeParse({
      name: 'Nafis',
      email: 'nafis@example.com',
      message: buildString(MAX_MESSAGE_LENGTH + 1),
    });

    expect(result.success).toBe(false);
  });

  it('rejects emails that exceed the max length', () => {
    const localLength = MAX_EMAIL_LENGTH - '@example.com'.length;
    const email = `${buildString(localLength)}@example.com`;
    const result = contactSchema.safeParse({
      name: 'Nafis',
      email: `${email}a`,
      message: 'Hello',
    });

    expect(result.success).toBe(false);
  });
});
