import * as restify from "restify";
import {environment} from '../common/environment'
import {Router} from '../common/router'

export class Server {

    application: restify.Server

    initRoutes(routers: Router[] = []): Promise<any>{
        return new Promise((resolve,reject)=>{
            try {
                
                this.application = restify.createServer({
                    name: "api",
                    version: "1.0.0"
                  });

                // plugin para capturar parâmetros de url:
                this.application.use(restify.plugins.queryParser());

                // ROUTES:
                for (let router of routers){
                    router.applyRoutes(this.application)
                }

                // http://localhost:3000/info?param1=value1&param2=value2

                this.application.get("/info", [
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

                this.application.listen(environment.server.port, () => {
                    //console.log("api is running on http://localhost:3000");
                    resolve(this.application)
                });

            } catch (error) {
                reject(error)
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initRoutes(routers).then(()=>this)
    }

}