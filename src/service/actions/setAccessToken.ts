"use server";

import { authKey } from "@/constants/authkey";
import { cookies } from "next/headers";

const setAccessToken = async (token: string) => {
  (await cookies()).set(authKey, token);
};

export default setAccessToken;
