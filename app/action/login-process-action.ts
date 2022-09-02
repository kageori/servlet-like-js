import { HttpRequest } from '@servlet/request'
import { HttpResponse } from '@servlet/response'
import {Action} from './action'

export class LoginProcessAction extends Action {
    async execute(): Promise<void> {
        const loginId = this.req.getParameter('loginId')
        const password = this.req.getParameter('password')

        this.req.setAttribute('loginId', loginId)
        this.req.setAttribute('password', password)

        if (loginId === null || loginId.length === 0) {
            this.req.setAttribute('errorMessage', 'ログインIDは必須です')
            return this.forward('/login')
        }
        if (password === null || password.length === 0) {
            this.req.setAttribute('errorMessage', 'パスワードは必須です')
            return this.forward('/login')
        }
        if (loginId !== 'user1' || password !== 'password') {
            this.req.setAttribute('errorMessage', 'ユーザーIDまたはパスワードが一致しません')
            return this.forward('/login')
        }

        return this.redirect(this.req.getContextPath() + '/list')
    }
}