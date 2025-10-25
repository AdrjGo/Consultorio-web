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
};

export const decodeToken = () => {
  const token = document.cookie.split(";")[0].split("=")[1];

  if (token) {
    const decoded: Token = jwtDecode(token);
    return decoded;
  }
};
