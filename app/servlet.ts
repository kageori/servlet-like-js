import {HttpServlet} from "@servlet/http-servlet";
import {HttpRequest} from "@servlet/request";
import {HttpResponse} from "@servlet/response";
import {Action} from "./action/action"
import {LoginAction} from "./action/login-action"
import {LoginProcessAction} from "./action/login-process-action"
import {ListAction} from "./action/list-action"
import { NotFound, ServletError, InternalServerError } from "@servlet/error";

export class Todo {
    constructor(readonly title: string, readonly comment: string) {}
}

export class DispatcherServlet extends HttpServlet {
    protected async doGet(req: HttpRequest, res: HttpResponse): Promise<void> {
       return this.execute(req,res)
    }

    protected async doPost(req: HttpRequest, res: HttpResponse): Promise<void> {
        return this.execute(req,res)
    }

    private async execute(req: HttpRequest, res: HttpResponse): Promise<void>{
        const path = req.getRequestURI().substring(req.getContextPath().length)
        const action: Action|null = this.findAction(path)
        if(action === null){
            res.sendError(NotFound)
        } else {
            try {
                action.execute(req,res)
            } catch (error) {
                if (error instanceof ServletError) {
                    throw error
                }
                else if(error instanceof Error) {
                    throw new InternalServerError(error.message)
                }
                else {
                    throw new InternalServerError(JSON.stringify(error))
                }
            }
        }
    }

    private findAction(path: string): Action|null {
        switch (path) {
            case "/login":
                return new LoginAction()
            case "/login-process":
                return new LoginProcessAction()
            case "/list":
                return new ListAction()
            default:
                return null
        }
    }

}
