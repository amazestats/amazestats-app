export interface MatchRes {
  id: number
  home_team: number
  away_team: number
}

export class Match {
  id: number
  homeTeam: number
  awayTeam: number

  constructor(res: MatchRes) {
    this.id = res.id
    this.homeTeam = res.home_team
    this.awayTeam = res.away_team
  }
}
