import {HttpServlet} from "@servlet/http-servlet";
import {HttpRequest} from "@servlet/request";
import {HttpResponse} from "@servlet/response";

export class Todo {
    constructor(readonly title: string, readonly comment: string) {}
}

export class DispatcherServlet extends HttpServlet {
    protected async doGet(req: HttpRequest, res: HttpResponse): Promise<void> {
        const todoList: Todo[] = [
            new Todo('test', 'test'),
        ]

        req.setAttribute('todoList', todoList)
        return req.getRequestDispatcher('/list').forward(req, res)
    }

}
