export class User{

    private tokenExpired:boolean = false;

    constructor(public username:string,  
        private _token:string, public tokenExpirationDate:Date, 
        private _maximumBooksLoan:number, private _maximumBooksReservation:number){

    }

    hasTokenExpired():boolean{

        if(this.tokenExpired){ return true;} // if already expired, skip checks and return true

        else{

            if (((new Date()).getTime() >= this.tokenExpirationDate.getTime())){

                // if current Date is higher than the expected expiration date, the token is expired

                this.tokenExpired = true;

                return true;
            }


        }

        return false;


    }

    get token():string|null{

        if(this.tokenExpired == true){

            return null;
        }

        return this._token;

        
    }

    get maximumBooksLoan():number{

        return this._maximumBooksLoan;

    }

    get maximumBooksReservation():number{

        return this._maximumBooksReservation;
    }


}