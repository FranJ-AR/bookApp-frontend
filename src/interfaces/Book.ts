import { Category } from "src/interfaces/Category";
import { Subcategory } from "src/interfaces/Subcategory";
import { BookUserStatus } from "./BookUserStatus";
import { Author } from "./Author";


export interface Book{

    id:number,
    name:string,
    category:Category,
    subcategory:Subcategory,
    author:Author,
    imageUrl:string,
    numberCopies:number,
    description:string,
    numberReservated:number,
    numberLoaned:number,
    canBeLoaned:boolean;
    copiesLeft:number;
    userStatus?:BookUserStatus; // it will be filled 
    // by the frontend when needed, by default it is undefined

}