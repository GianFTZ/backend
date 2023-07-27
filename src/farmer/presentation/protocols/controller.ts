import { Http } from "./http";

export interface Controller {
    handle: (req: Http.Request) => Promise<Http.Response> 
}