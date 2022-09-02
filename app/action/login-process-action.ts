import { HttpRequest } from '@servlet/request'
import { HttpResponse } from '@servlet/response'
import {Action} from './action'

export class LoginProcessAction extends Action {
    async execute(req: HttpRequest, res: HttpResponse): Promise<void> {
        const loginId = req.getParameter('loginId')
        const password = req.getParameter('password')

        req.setAttribute('loginId', loginId)
        req.setAttribute('password', password)

        if (loginId === null || loginId.length === 0) {
            req.setAttribute('errorMessage', 'ログインIDは必須です')
            return this.forward(req,res,'/login')
        }
        if (password === null || password.length === 0) {
            req.setAttribute('errorMessage', 'パスワードは必須です')
            return this.forward(req,res,'/login')
        }
        if (loginId !== 'user1' || password !== 'password') {
            req.setAttribute('errorMessage', 'ユーザーIDまたはパスワードが一致しません')
            return this.forward(req,res,'/login')
        }

        return res.sendRedirect(req.getContextPath() + '/list')
    }
}