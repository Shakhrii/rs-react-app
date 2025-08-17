'use server';

import { cookies } from 'next/headers';

export async function getCookieAction(key: string) {
  return (await cookies()).get(key)?.value;
}
