"use server";

import { cookies } from "next/headers";

export const deleteCookies = (keys: string[]) => {
  keys.forEach(async (key) => {
    const cookieStore = await cookies();
    cookieStore.delete(key);
  });
};
