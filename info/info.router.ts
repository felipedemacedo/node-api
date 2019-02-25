import {Router} from '../common/router'
import * as restify from 'restify'

// http://localhost:3000/info?param1=value1&param2=value2
class InfoRouter extends Router{
    applyRoutes(application: restify.Server){
        application.get('/info', 
            [
                (req, resp, next) => {
                    if (req.userAgent() && req.userAgent().includes("Edge")) {
                        resp.status(400);
                        resp.json({
                        message: "This functionality does not work correctly on EDGE Browser."
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
            ]
        )
    }
}

export const infoRouter = new InfoRouter()