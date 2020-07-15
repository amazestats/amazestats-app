import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Match, MatchRes } from '@models/match'
import { Set } from '@models/set'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  getMatchById(id: number) {
    return this.http.get<{ match: MatchRes }>(`/matches/${id}`)
      .pipe(map(res => new Match(res.match)))
  }

  getMatchesBySeason(season: number): Observable<Match[]> {
    return this.http.get<{ matches: MatchRes[] }>(`/seasons/${season}/matches`)
      .pipe(map(res => res.matches.map(match => new Match(match))))

  }

  getConcatinatedSets(sets: Set[]): string {
    let homeWinSets = 0
    let awayWinSets = 0
    sets.forEach(
      set => {
        set.homeScore > set.awayScore ? homeWinSets++ : awayWinSets++
      })
    return homeWinSets + ' - ' + awayWinSets
  }

  setMatchReferee(matchId: number, refereeId: number) {
    console.debug(`Setting referee: team ${refereeId} to match ${matchId}`)
    return this.http.put(`/matches/${matchId}/referee`, {id: refereeId}).subscribe()
  }
}
