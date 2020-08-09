import { Injectable } from '@angular/core'
import { Team, TeamRes } from '@models/team'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map, filter, flatMap } from 'rxjs/operators'
import { Season } from '@models/season'
import { Match } from '@models/match'
import { SeasonService } from './season.service'

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private http: HttpClient,
    private seasonService: SeasonService,
  ) { }

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

  getTeamsBySeason(season: number): Observable<Team[]> {
    console.warn('Using workaround!',
      'Getting teams by matches instead of API call.')

    return this.seasonService.getSeasonById(season)
      .pipe(
        flatMap(season => {
          const teamsInSeason = this.teamsFromMatches(season.matches)

          return this.getTeams()
            .pipe(map(teams => teams.filter(
              team => teamsInSeason.includes(team.id)
            )))

        })
      )
  }

  private teamsFromMatches(matches: Match[]): number[] {
    return [... new Set(
      matches
        .map((match) => [match.homeTeam, match.awayTeam])
        .reduce((a, b) => a.concat(b), [])
    )]
  }
}
