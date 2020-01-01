const express = require("express");
const app = express();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const guard = require("express-jwt-permissions")({ requestProperty: "jwt" });

const ONEGRAPH_APP_ID = process.env.ONEGRAPH_APP_ID;

const jwtMiddleware = options => {
  const { credentialsRequired, appId } = options;

  const secret =
    options.secret ||
    // By default, use the zero-config JWKs to verify
    jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 1,
      jwksUri: `https://serve.onegraph.com/app/${appId}/.well-known/jwks.json`
    });

  return jwt({
    secret: secret,
    issuer: "OneGraph",
    audience: `https://serve.onegraph.com/dashboard/app/${appId}`,
    userProperty: "jwt",
    credentialsRequired: credentialsRequired
  });
};

app.use(
  jwtMiddleware({
    appId: ONEGRAPH_APP_ID,
    credentialsRequired: false
  })
);

//create a server object:
app.get("/", function(req, res) {
  // Since this route is unguarded, `req.jwt` may be null
  const reqJson = JSON.stringify(req.jwt || {}, null, 2);
  res.write(reqJson); //write a response to the client
  res.end(); //end the response
});

// Note that express-jwt-permissions expects a jwt with the minimum structure:
// {permissions: []}
// See https://github.com/MichielDeMey/express-jwt-permissions#error-handling for customization options
app.get("/restricted", guard.check(["admin"]), function(req, res) {
  const reqJson = JSON.stringify(req.jwt, null, 2);
  res.write(reqJson); //write a response to the client
  res.end(); //end the response
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
  console.log(`Server running on ${PORT}`);
});
