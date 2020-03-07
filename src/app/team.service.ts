import { Injectable } from '@angular/core';
import { Team, TeamRes } from './team';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<{ teams: TeamRes[] }>('/teams')
      .pipe(map(teams => teams.teams.map(team => new Team(team))))
  }
}
