import { Injectable } from '@angular/core';
import { Division, DivisionRes } from './division';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private http: HttpClient) { }

  getDivisions(): Observable<Division[]> {
    return this.http.get<{ divisions: DivisionRes[] }>('/divisions')
      .pipe(map(res => res.divisions.map(division => new Division(division))))
  }

  getDivision(id: number): Observable<Division> {
    return this.http.get<{ division: DivisionRes }>(`/divisions/${id}`)
      .pipe(map(res => new Division(res.division)))
  }

  getDivisionByKey(key: string): Observable<Division> {
    return this.http.get<{ division: DivisionRes }>(`/divisions?key=${key}`)
      .pipe(map(res => new Division(res.division)))
  }
}
