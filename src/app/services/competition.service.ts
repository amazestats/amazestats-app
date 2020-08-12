import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

type AdminList = { id: number, alias: string }[]

const DEFAULT_COMPETITION = 1

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(
    private http: HttpClient,
  ) { }

  getAdmins(
    competitionId: number = DEFAULT_COMPETITION
  ): Observable<AdminList> {
    return this.http.get<{ admins: AdminList }>
      (`/competitions/${competitionId}/admins`)
      .pipe(map(res => res.admins))
  }
}
