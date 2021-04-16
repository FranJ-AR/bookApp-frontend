import { Author } from "./app/Author";
import { BookUserStatus } from "./app/BookUserStatus";
import { Category } from "./Category";
import { Subcategory } from "./Subcategory";

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