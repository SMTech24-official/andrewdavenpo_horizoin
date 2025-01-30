import { jwtDecode } from "jwt-decode";

// {
//   "id": 3,
//   "email": "nahidmahmudn2@gmail.com",
//   "role": "CUSTOMER",
//   "isAcceptedTermsAndPrivacy": false,
//   "isAgeOver18": true,
//   "iat": 1733922090,
//   "exp": 1733932890
// }
interface UserJwtPayload {
  id: number;
  email: string;
  role: string;
  iat: number; // Issued at timestamp
  exp: number; // Expiration timestamp
  isAgeOver18: boolean;
  isAcceptedTermsAndPrivacy: boolean;
}

// Update the function to use the new type
export const getUserInfo = (): UserJwtPayload | null => {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
      return null;
    }

    // Decode the token using jwt-decode
    const user = jwtDecode<UserJwtPayload>(token);

    // console.log(user);

    return user;
  } catch (error) {
    console.error("Failed to decode token or retrieve user info:", error);
    return null;
  }
};
