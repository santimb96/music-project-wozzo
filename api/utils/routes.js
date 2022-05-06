const routes = {
  'user': [
    {
      method: 'GET',
      route: '/users',
    },
    {
      method: 'GET',
      route: '/users/:id',
    },
    {
      method: 'POST',
      route: '/users/public/login',
    },
    {
      method: 'POST',
      route: '/users',
    },
    {
      method: 'PUT',
      route: 'users/:id',
    },
    {
      method: 'DELETE',
      route: 'users/:id',
    },
    {
      method: 'GET',
      route: '/artists',
    },
    {
      method: 'GET',
      route: '/artists/:id',
    },
    {
      method: 'GET',
      route: '/songs',
    },
    {
      method: 'GET',
      route: '/songs/:id',
    },
    {
      method: 'GET',
      route: '/favouriteSongs',
    },
    {
      method: 'POST',
      route: '/favouriteSongs',
    },
    {
      method: 'DELETE',
      route: '/favouriteSongs/:id',
    }


  ], 
  'admin': [
    {
      method: 'GET',
      route: '/users',
    },
    {
      method: 'GET',
      route: '/users/:id',
    },
    {
      method: 'POST',
      route: '/users/public/login',
    },
    {
      method: 'POST',
      route: '/users',
    },
    {
      method: 'GET',
      route: '/artists',
    },
    {
      method: 'GET',
      route: '/artists/:id',
    },
    {
      method: 'GET',
      route: '/songs',
    },
    {
      method: 'GET',
      route: '/songs/:id',
    },
    {
      method: 'POST',
      route: '/users',
    },
    
    {
      method: 'POST',
      route: '/songs',
    },
    
    {
      method: 'POST',
      route: '/artists',
    },
    {
      method: 'PUT',
      route: '/users/:id',
    },
    {
      method: 'PUT',
      route: '/artists/:id',
    },
    {
      method: 'PUT',
      route: '/songs/:id',
    },
    {
      method: 'DELETE',
      route: '/users/:id',
    },
    {
      method: 'DELETE',
      route: '/artists/:id',
    },
    {
      method: 'DELETE',
      route: '/songs/:id',
    },
    {
      method: 'POST',
      route: '/login',
    },
    {
      method: 'GET',
      route: '/userRoles'
    },
    
    {
      method: 'GET',
      route: '/userRoles/:id'
    },
    {
      method: 'GET',
      route: '/favouriteSongs',
    },
    {
      method: 'POST',
      route: '/favouriteSongs',
    },
    {
      method: 'DELETE',
      route: '/favouriteSongs/:id',
    }
  ]
};

export default routes;