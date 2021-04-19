import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservation } from './Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private getReservationsUrl:string = "http://localhost:8080/reservations";

  private addReservationUrl:string = "http://localhost:8080/add-reservation/{id}";

  private removeReservationUrl:string = "http://localhost:8080/remove-reservation/{id}";

  constructor(private httpClient:HttpClient) { }

  getReservationsByLoggedUser():Observable<Reservation[]>{

    return this.httpClient.get<Reservation[]>(this.getReservationsUrl);

  }

  addReservationByLoggedUser(id:number):Observable<void>{

    return this.httpClient.post<void>(this.addReservationUrl.replace("{id}",id.toString()),null);

  }

  removeReservationByLoggedUser(id:number):Observable<void>{


    return this.httpClient.delete<void>(this.removeReservationUrl.replace("{id}",id.toString()));

  }

  getBookIdReservationsByLoggedUser(): Observable<Map<number, null>> {

    return this.getReservationsByLoggedUser().pipe(map((reservations) => {

      let reservationBookIds: Map<number, null> = new Map<number, null>();

      reservations.map((reservation) => reservationBookIds.set(reservation.book.id, null));

      return reservationBookIds;

    }

    ))

  }
}
