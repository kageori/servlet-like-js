import {HttpRequest} from "@servlet/request";
import {HttpResponse} from "@servlet/response";

export abstract class Action {
    constructor(
        protected readonly req: HttpRequest,
        protected readonly res: HttpResponse
    ) {}

    public abstract execute(): void

    protected forward(path: string): Promise<void>{
        return this.req.getRequestDispatcher(path).forward(this.req,this.res)
    }

    protected redirect(path: string){
        return this.res.sendRedirect(path)
    }
}