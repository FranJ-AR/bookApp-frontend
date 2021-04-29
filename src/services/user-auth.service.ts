import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  public userSubject = new BehaviorSubject<User|null>(null);

  constructor() { 

  }

}
