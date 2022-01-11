export default {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Housy',
      version: '1.0.0',
      description: 'The API documentation of Housy endpoint',

      contact: {
        name: 'Ranjit Kumar Pandit',
        url: 'https://github.com/imReCoder',
        email: 'ranjitkumar448@yahoo.com',
      },
    },
    basePath: '/api',
    servers: [
      {
        url: 'http://localhost:3000/api/',
      },
    ],
  },
  tags: [
    {
      "name": "Customer",
      "description": "API for customer"
    }
  ],
  apis: [
    "src/models/*.js",
    "src/utils/helpers/*.js",
    "src/api/controllers/user/*.js",
    "src/api/controllers/user/edit/*.js",
    "src/api/controllers/user/auth/*.js"
  ]
};