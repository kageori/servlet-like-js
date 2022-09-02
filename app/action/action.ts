import {HttpRequest} from "@servlet/request";
import {HttpResponse} from "@servlet/response";

export abstract class Action {
    abstract execute(req: HttpRequest, res: HttpResponse): void
    forward(req: HttpRequest, res: HttpResponse, path: string): Promise<void>{
        return req.getRequestDispatcher(path).forward(req, res)
    }
}