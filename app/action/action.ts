import {HttpRequest} from "@servlet/request";
import {HttpResponse} from "@servlet/response";

export abstract class Action {
    abstract execute(req: HttpRequest, res: HttpResponse): void
}