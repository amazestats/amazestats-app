import { Team } from './team'
import { Match } from './match'

export class Division {
  id: number
  name: string
  key: string
  teams: Team[]
  matches: Match[]

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
    this.key = ""
    this.teams = []
    this.matches = []
  }
}
