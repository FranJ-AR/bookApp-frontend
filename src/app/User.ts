export class User{

    constructor(public username:string, public password:string, 
        private _token:string, private tokenExpirationTime:number){


    }

    getToken(){

        
    }

}