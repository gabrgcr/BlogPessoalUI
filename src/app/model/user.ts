import { postagem } from "./postagem";

export class user{
    public user:string;
    public foto:string;
    public id:number;
    public nome:string;
    public token:string;
    public post:postagem[];
    public senha:string;
    public tipo:string;
}