import { tema } from "./Tema";
import { user } from "./user";

export class postagem{
    public id: number;
    public titulo: string;
    public texto: string;
    public data: Date;
    public usuario: user;
    public tema: tema;
}