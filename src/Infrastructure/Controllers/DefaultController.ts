import { IDefaultController } from "./IDefaultController";


export class DefaultController<T> implements IDefaultController <T>{
    public async get(url: string): Promise<T> {
        let res = await fetch(url, {method: "GET"});
        return await res.json();
    }
    
    public async post(url: string, body: T): Promise<T> {
        let res = await fetch(url, {method: "POST", body: JSON.stringify(body)});
        return await res.json();
    }
    public async put(url: string, body: T): Promise<T> {
        let res = await fetch(url, {method: "PUT", body: JSON.stringify(body)});
        return await res.json();
    }
    public async delete(url: string, body: T): Promise<string> {
        let res = await fetch(url, {method: "DELETE", body: JSON.stringify(body)});
        return await res.text();
    }
}