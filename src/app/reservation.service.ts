import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from './Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private getReservationsUrl:string = "http://localhost:8080/reservations";

  private addReservationUrl:string = "http://localhost:8080/add-reservation/{id}";

  constructor(private httpClient:HttpClient) { }

  getReservationsByLoggedUser():Observable<Reservation[]>{

    return this.httpClient.get<Reservation[]>(this.getReservationsUrl);

  }

  addReservationByLoggedUser(id:number):Observable<void>{

    return this.httpClient.post<void>(this.addReservationUrl.replace("{id}",id.toString()),null);
  }
}
