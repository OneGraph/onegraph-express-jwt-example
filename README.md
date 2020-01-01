An example app showing how to use [OneGraph's
JWT](https://www.onegraph.com/docs/jwt.html).

Read more about using [OneGraph JWT and express](https://www.onegraph.com/docs/jwt_express.html) [OneGraph
AuthGuardian](https://www.onegraph.com/docs/auth_guardian.html) to visually
configure your application security.

# Running the example

To start the server, find your `ONEGRAPH_APP_ID` and run:

```
git clone https://github.com/OneGraph/onegraph-express-jwt-example.git
cd onegraph-express-jwt-example
yarn
ONEGRAPH_APP_ID="<your-app-id>" yarn start
```

You should be able to use any OneGraph-issued JWT to access `http://localhost:8080/` now!
