import { HttpRequest } from '@servlet/request'
import { HttpResponse } from '@servlet/response'
import {Action} from './action'

export class Todo {
    constructor(readonly title: string, readonly comment: string) {}
}

export class ListAction extends Action {
    execute(req: HttpRequest, res: HttpResponse): Promise<void> {
        const todoList: Todo[] = [
            new Todo('原稿を仕上げる', '締め切りは6/1'),
            new Todo('髪を切る', 'パーマかけようかな'),
        ]

        req.setAttribute('todoList', todoList)
        return this.forward(req, res, '/list')
    }
}