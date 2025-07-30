export const loginClient = new JSONRpcClient({
  url: 'https://user-api.simplybook.me/login',
  onerror: function (error) {
    console.error(error);
  },
});

export const apiClient = (token: string) => {
  return new JSONRpcClient({
    url: 'https://user-api.simplybook.me',
    headers: {
      'X-Company-Login': process.env.REACT_APP_STORE_NAME || '',
      'X-Token': token || '',
    },
    onerror: function (error) {
      console.error(error);
    },
  });
};
