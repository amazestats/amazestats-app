import { Injectable } from '@angular/core';
import { Division } from './division';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private http: HttpClient) { }

  getDivisions(): Observable<Division[]> {
    return this.http.get<{ divisions: Division[] }>('/divisions')
      .pipe(map(res => res.divisions))
  }

  getDivision(id: number): Observable<Division> {
    return this.http.get<{ division: Division }>(`/divisions/${id}`)
      .pipe(map(res => res.division))
  }

  getDivisionByKey(key: string): Observable<Division> {
    return this.http.get<{ division: Division }>(`/divisions?key=${key}`)
      .pipe(map(res => res.division))
  }
}
