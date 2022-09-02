import {HttpServlet} from "@servlet/http-servlet";
import {HttpRequest} from "@servlet/request";
import {HttpResponse} from "@servlet/response";
import {Action} from "./action/action"
import {LoginAction} from "./action/login-action"
import {LoginProcessAction} from "./action/login-process-action"
import {ListAction} from "./action/list-action"
import { NotFound, ServletError, InternalServerError } from "@servlet/error";
import { Properties } from "@util/properties";
import { ClassLoader, Class } from "@util/class";


export class Todo {
    constructor(readonly title: string, readonly comment: string) {}
}

export class DispatcherServlet extends HttpServlet {
    private route!: Properties

    public async init(): Promise<void> {
        this.route = new Properties()
        try {
            const cl: ClassLoader = this.getClass().getClassLoader()
            this.route.load(await cl.getResourceAsStream("route.properties"))
        } catch (e) {
            throw new ServletError("route.propertiesが読み込めません", e)
        }
    }

    protected async doGet(req: HttpRequest, res: HttpResponse): Promise<void> {
        return this.execute(req,res)
    }

    protected async doPost(req: HttpRequest, res: HttpResponse): Promise<void> {
        return this.execute(req,res)
    }

    private async execute(req: HttpRequest, res: HttpResponse): Promise<void>{
        const path = req.getRequestURI().substring(req.getContextPath().length)
        const action: Action|null = await this.findAction(req, res, path)

        if(action === null){
            res.sendError(NotFound)
        } else {
            try {
                action.execute()
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

    private async findAction(req: HttpRequest, res: HttpResponse, path: string): Promise<Action|null> {
        const className: string = this.route.getProperty(path)
        try {
            const clazz = await Class.forName(className)
            return clazz.getDeclaredConstructor().newInstance(req, res)
        } catch (e) {
            throw new ServletError("アクションの生成に失敗しました", e)
        }
    }

}
