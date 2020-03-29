import { MatchRes, Match } from './match'

export interface SeasonRes {
  id: number
  name: string
  key: string
  division: number
  competition: number
  matches: MatchRes[]
}

export class Season {
  id: number
  name: string
  key: string
  division: number
  competition: number
  matches: Match[]

  constructor(res: SeasonRes) {
    this.id = res.id
    this.name = res.name
    this.key = res.key
    this.division = res.division
    this.competition = res.competition
    this.matches = res.matches ?
      res.matches.map(match => new Match(match)) : null
  }
}
