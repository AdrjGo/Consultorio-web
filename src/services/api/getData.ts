import { getToken } from "@utils";

type Data = {
  message?: string;
  url: string;
};

export const getData = async ({ message, url }: Data) => {
  const token = getToken();
  const res = await fetch(`http://localhost:5252/api/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || { message });
  }

  return result;
};
