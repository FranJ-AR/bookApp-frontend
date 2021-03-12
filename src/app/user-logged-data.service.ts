import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedDataService {

  user = new BehaviorSubject<User|null>(null);

  existUser():boolean{

    return !!this.user; // true if exists user, false if does not exist

  }

  constructor() { 
    
  }
}
