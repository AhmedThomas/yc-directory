import { z } from 'zod';

export const formSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be at most 100 characters long'),
  description: z
    .string()
    .min(20, 'Description must be at least 3 characters long')
    .max(700, 'Description must be at most 100 characters long'),
  category: z
    .string()
    .min(3, 'Category must be at least 3 characters long')
    .max(20, 'Category must be at most 50 characters long'),
  link: z
    .string()
    .url('Link must be a valid URL')
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        const contentType = res.headers.get('Content-Type');

        return contentType?.startsWith('image/');
      } catch {
        return false;
      }
    }),
  pitch: z.string().min(200, 'Pitch must be at least 20 characters long'),
});
