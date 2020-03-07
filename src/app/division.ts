import { Team, TeamRes } from './team'
import { Match, MatchRes } from './match'

export interface DivisionRes {
  id: number
  name: string
  key: string
  teams: TeamRes[]
  matches: MatchRes[]
}

export class Division {
  id: number
  name: string
  key: string
  teams: Team[]
  matches: Match[]

  constructor(res: DivisionRes) {
    this.id = res.id
    this.name = res.name
    this.key = res.key
    this.teams = res.teams ? res.teams.map(team => new Team(team)) : null
    this.matches = res.matches ? res.matches.map(match => new Match(match)) : null
  }
}
