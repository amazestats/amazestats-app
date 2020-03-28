import { Injectable } from '@angular/core'
import { Division, DivisionRes } from '@models/division'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

const DEFAULT_COMPETITION = 1

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private http: HttpClient) { }

  /**
   * Abstracts away the need of know of competition for most parts of the app.
   */
  getDivisions(): Observable<Division[]> {
    return this.getDivisionsInCompetition(DEFAULT_COMPETITION)
  }

  getDivisionsInCompetition(competition: number): Observable<Division[]> {
    return this.http.get
      <{ divisions: DivisionRes[] }>(`/competitions/${competition}/divisions`)
      .pipe(map(res => res.divisions.map(division => new Division(division))))
  }

  getDivision(id: number): Observable<Division> {
    return this.http.get<{ division: DivisionRes }>(`/divisions/${id}`)
      .pipe(map(res => new Division(res.division)))
  }

  getDivisionByKey(key: string): Observable<Division> {
    return this.http.get<{ divisions: DivisionRes[] }>(`/divisions?key=${key}`)
      .pipe(map(res => new Division(res.divisions[0])))
  }
}
