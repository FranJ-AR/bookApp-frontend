export interface LoginResponse{

    token:string;
    tokenExpirationTime:number;
    maximumBooksLoan:number
    maximumBooksReservation:number;
}