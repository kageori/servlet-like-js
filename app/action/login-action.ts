import { HttpRequest } from '@servlet/request'
import { HttpResponse } from '@servlet/response'
import {Action} from './action'

export class LoginAction extends Action {
    execute(req: HttpRequest, res: HttpResponse): Promise<void> {
        return this.forward(req, res, '/login')
    }
}