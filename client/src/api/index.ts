export const API = async (url: String, options: any) => {
  const jwt = localStorage.getItem('jwt');
  const res = await fetch(`/api/${url}`, {
    headers: jwt
      ? {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
          ...options.headers,
        }
      : {
          'Content-Type': 'application/json',
          ...options.headers,
        },
    ...options,
  });
  const data = await res.json();
  return data;
};
