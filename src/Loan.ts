import { Book } from "./Book";

export interface Loan{

    book:Book,
    timestamp:Date,
    beenPickedUp:boolean,
    maximumReturnDate:Date

}