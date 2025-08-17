'use server';

import { cookies } from 'next/headers';

export async function setCookieAction(
  key: string,
  value: string,
  options = {}
) {
  (await cookies()).set({
    name: key,
    value: value,
    ...options, // maxAge, path, domain, secure и т.д.
  });
}
