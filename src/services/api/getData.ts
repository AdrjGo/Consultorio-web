import { getToken } from "@utils";
import { API_URL } from "@config";

type Data = {
  message?: string;
  url: string;
};

export const getData = async ({ message, url }: Data) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    },
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || { message });
  }

  return result;
};
