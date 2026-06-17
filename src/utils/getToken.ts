export const getToken = () => {
  const token = document.cookie.split(";")[0].split("=")[1];
  return token;
};
