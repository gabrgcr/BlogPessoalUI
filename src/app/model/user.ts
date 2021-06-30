import { postagem } from "./postagem";

export class user{
    public id:number;
    public nome:string;
    public user:string;
    public senha:string;
    public foto:string;
    public tipo:string;
    public post:postagem[];
}