import { HttpClient, HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import {environment} from '../../assets/environment'


@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {

  constructor(private http:HttpClient) { }

  GetAllRegistration<T>(obj:HttpParams):Observable<T>{
    return(this.http.get<T>(environment.baseUrl + '/GetAllRegistration', {params:obj}).pipe(
      catchError((error)=>{ throw error}
    )
    
    ))
  }

  GetRegistrationStats<T>(obj:HttpParams):Observable<T>{
    return(this.http.get<T>(environment.baseUrl+ '/ReservationStats', {params:obj}).pipe(
      catchError((error)=>{ throw error}
    )
    
    ))
  }


}
