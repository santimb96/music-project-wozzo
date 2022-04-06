const publicRoutes = {
  'public': [
    {
      method: 'GET',
      route: '/artist/:name',
    },
    {
      method: 'GET',
      route: '/song/:name',
    },
    {
      method: 'GET',
      route: '/',
    },
  ]
};

export default publicRoutes;