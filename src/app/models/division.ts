import { Team, TeamRes } from '@models/team'
import { Match, MatchRes } from '@models/match'
import { Season, SeasonRes } from '@models/season'

export interface DivisionRes {
  id: number
  name: string
  key: string
  teams: TeamRes[]
  matches: MatchRes[]
  seasons: SeasonRes[]
}

export class Division {
  id: number
  name: string
  key: string
  teams: Team[]
  matches: Match[]
  seasons: Season[]

  constructor(res: DivisionRes) {
    this.id = res.id
    this.name = res.name
    this.key = res.key
    this.teams = res.teams ? res.teams.map(team => new Team(team)) : null
    this.matches = res.matches ? res.matches.map(match => new Match(match)) : null
    this.seasons = res.seasons ? res.seasons.map(season => new Season(season)) : null
  }
}
