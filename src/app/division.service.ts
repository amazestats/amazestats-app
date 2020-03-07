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
      .pipe(map(divisions => divisions.divisions))
  }

  getDivision(key: string): Promise<Division> {
    return Promise.resolve({
      name: "Premier",
      id: 16,
    })
  }
}
