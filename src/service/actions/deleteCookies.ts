// "use server";

// import { cookies } from "next/headers";

// export const deleteCookies = async (keys: string[]) => {
//   keys.forEach(async (key) => {
//     const cookieStore = await cookies();
//     cookieStore.delete(key);
//   });
// };
"use server";

import { cookies } from "next/headers";

export const deleteCookies = async (keys: string[]) => {
  const cookieStore = await cookies();
  keys.forEach((key) => {
    cookieStore.delete(key);
  });
};