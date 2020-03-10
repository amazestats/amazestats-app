export interface SetRes {
  id: number
  match: number
  home_score: number
  away_score: number
}

export class Set {
  id: number
  match: number
  homeScore: number
  awayScore: number

  constructor(res: SetRes) {
    this.id = res.id
    this.match = res.match
    this.homeScore = res.home_score
    this.awayScore = res.away_score
  }
}
