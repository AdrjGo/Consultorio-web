type UrlParams = {
  name: string;
  value?: string;
};

export const setUrlParams = ({ name, value }: UrlParams) => {
  const params = new URLSearchParams(window.location.search);

  params.set(name, value || "");

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);

  return params.toString();
};

export const getUrlParams = ({ name }: UrlParams) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
};
