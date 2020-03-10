export interface TeamRes {
  id: number
  key: string
  name: string
  division: number
}

export class Team {
  id: number
  key: string
  name: string
  division: number

  constructor(res: TeamRes) {
    this.id = res.id
    this.key = res.key
    this.name = res.name
    this.division = res.division
  }
}
