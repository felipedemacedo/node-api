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