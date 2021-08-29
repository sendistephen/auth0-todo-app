const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-5h0ossfj.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://www.todos-api.com',
  issuer: 'https://dev-5h0ossfj.us.auth0.com/',
  algorithms: ['RS256'],
});

module.exports = {
  jwtCheck,
};
