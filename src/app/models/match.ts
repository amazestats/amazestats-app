import { Set, SetRes } from '@models/set'

export interface MatchRes {
  id: number
  home_team: number
  away_team: number
  sets: SetRes[]
}

export class Match {
  id: number
  homeTeam: number
  awayTeam: number
  sets: Set[]

  constructor(res: MatchRes) {
    this.id = res.id
    this.homeTeam = res.home_team
    this.awayTeam = res.away_team
    this.sets = res.sets ? res.sets.map(set => new Set(set)) : null
  }
}
