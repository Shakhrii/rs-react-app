import * as z from 'zod';
import { getCountryNames } from '../data/countries';

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0, {
    message: 'Please select a file',
  })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: 'File size must be less than 5MB',
  })
  .refine(
    (file) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      return allowedTypes.includes(file.type);
    },
    {
      message: 'Only JPEG and PNG images are allowed',
    }
  );

const passwordSchema = z
  .string()
  .min(8, 'Password must contain at least 8 symbols')
  .regex(/[0-9]/, 'Password must contain at least 1 number')
  .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least 1 special character');

export const FormSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name has to be filled')
      .regex(/^[A-Z]/, 'Name must start with uppercased letter')
      .regex(/^[A-Z][a-zA-Z]*$/, 'Name must contain only letters')
      .trim(),

    email: z
      .email('This is not a valid email')
      .min(1, 'Email has to be filled')
      .trim(),

    password: passwordSchema,
    confirm: z.string().min(1, 'Please confirm your password'),

    gender: z.enum(['male', 'female'], {
      message: 'Please select your gender',
    }),
    agreement: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
    avatar: fileSchema,
    country: z.enum(getCountryNames(), {
      message: 'Select country from the list',
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords must match',
    path: ['confirm'],
  });

export type FormDataItem = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  agreement: boolean;
  country: string;
  gender: 'male' | 'female';
  avatar: string;
};
