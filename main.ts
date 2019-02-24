import * as restify from "restify";

const server = restify.createServer({
  name: "api",
  version: "1.0.0"
});

// plugin para capturar parâmetros de url:
server.use(restify.plugins.queryParser());

// http://localhost:3000/info?param1=value1&param2=value2
server.get("/info", [
  (req, resp, next) => {
    if (req.userAgent() && req.userAgent().includes("Edge")) {
      resp.status(400);
      resp.json({
        message: "This functionality does not work correctly on EDGE Broser."
      });
      return next(false);
    }
    return next();
  },
  (req, resp, next) => {
    resp.status(400);
    resp.json({
      browser: req.userAgent(),
      method: req.method,
      url: req.url,
      path: req.path(),
      query: req.query
    });
    return next();
  }
]);

server.listen(3000, () => {
  console.log("api is running on http://localhost:3000");
});
