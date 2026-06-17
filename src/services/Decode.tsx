import { getToken } from "@utils";
import { jwtDecode } from "jwt-decode";

type Token = {
  aud: string;
  email: string;
  exp: number;
  iat: number;
  iss: string;
  name: string;
  nbf: number;
  personId: string;
  role: string;
  userId: string;
  permission: string[];
};

export const decodeToken = () => {
  const token = getToken();

  if (token) {
    const decoded: Token = jwtDecode(token);
    return decoded;
  }
};
