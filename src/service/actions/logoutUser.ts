import { authKey } from "@/constants/authkey";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookies } from "./deleteCookies";

const backendUrl = process.env.NEXT_PUBLIC_BASEURL;

export const logoutUser = async (router: AppRouterInstance) => {
  const response = await fetch(`${backendUrl}/auth/logout`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem(authKey)}`,
    },
    credentials: "include",
  });

  console.log(response);

  localStorage.removeItem(authKey);
  deleteCookies([authKey, "token"]);

  router.push("/");
  router.refresh();
};
