import { Team, TeamRes } from './team'
import { Match, MatchRes } from './match'
import { Set, SetRes } from './set'

export interface DivisionRes {
  id: number
  name: string
  key: string
  teams: TeamRes[]
  matches: MatchRes[]
  sets: SetRes[]
}

export class Division {
  id: number
  name: string
  key: string
  teams: Team[]
  matches: Match[]
  sets: Set[]

  constructor(res: DivisionRes) {
    this.id = res.id
    this.name = res.name
    this.key = res.key
    this.teams = res.teams ? res.teams.map(team => new Team(team)) : null
    this.matches = res.matches ? res.matches.map(match => new Match(match)) : null
    this.sets = res.sets ? res.sets.map(set => new Set(set)) : null
  }
}
