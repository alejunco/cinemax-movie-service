const healthCheckRoute = {
    method:  'GET',
    path:    '/health-check',
    options: {
      handler:     (request, h) => h.response(),
      description: 'Health Check',
      tags:        ['api'],
    },
  }
  
  module.exports = healthCheckRoute
  