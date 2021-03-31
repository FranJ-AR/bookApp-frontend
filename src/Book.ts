import { Author } from "./app/Author";
import { Category } from "./Category";
import { Subcategory } from "./Subcategory";

export interface Book{

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

}