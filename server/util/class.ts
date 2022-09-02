import * as path from "path";
import fs from 'fs'
import {tailAndRest} from "@util/array";
import {encode, root} from "server/const";

export class Class {
    private static get loader() {
        return new ClassLoader()
    }
    static forName(name: string): Promise<Class> {
        return this.loader.load(name)
    }

    constructor(private readonly cons: Constructor) {}

    getClassLoader(): ClassLoader {
        return Class.loader
    }
    getDeclaredConstructor(): DeclaredConstructor {
        return new DeclaredConstructor(this.cons)
    }
}

type Constructor = new (...args: any[]) => any
class DeclaredConstructor {
    constructor(private readonly c: Constructor) {
    }

    newInstance<Klass>(...args: unknown[]): Klass {
        return new this.c(...args)
    }
}

export class ClassLoader {
    async load(targetPath: string): Promise<Class> {
        const [modPath, name] = tailAndRest(targetPath.split('.'))
        const mod = await import(path.resolve(root, ...modPath))
        const klass = mod[name]

        if (klass !== undefined) {
            return new Class(klass)
        }
        else {
            throw new Error(`${targetPath}#${name} not found`)
        }
    }

    getResourceAsStream(targetPath: string): Promise<string[]> {
        return new Promise((res, rej) => {
            fs.readFile(
                path.resolve(root, targetPath),
                { encoding: encode },
                (err, data) => {
                    if (err) {
                        return rej(err)
                    } else {
                        res((data || '').split("\n"))
                    }
                }
            )
        })
    }
}

