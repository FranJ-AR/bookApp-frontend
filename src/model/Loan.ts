import { Book } from "./Book";

export interface Loan{

    book:Book,
    timestamp:Date,
    maximumReturnDate:Date
    maximumPickedUpDate:Date|null

}