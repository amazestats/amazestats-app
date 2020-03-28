import { Injectable } from '@angular/core'
import { Team, TeamRes } from '@models/team'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<{ team: TeamRes }>(`/teams/${id}`)
      .pipe(map(res => new Team(res.team)))
  }

  getTeamByKey(key: string): Observable<Team> {
    return this.http.get<{ teams: TeamRes[] }>(`/teams?key=${key}`)
      .pipe(map(res => new Team(res.teams[0])))
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<{ teams: TeamRes[] }>('/teams')
      .pipe(map(teams => teams.teams.map(team => new Team(team))))
  }

  getTeamsByDivision(id: number): Observable<Team[]> {
    return this.http.get<{ teams: TeamRes[] }>(`/divisions/${id}/teams`)
      .pipe(map(teams => teams.teams.map(team => new Team(team))))
  }
}
