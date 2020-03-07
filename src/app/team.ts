export interface TeamRes {
  id: number
  name: string
}

export class Team {
  id: number
  name: string

  constructor(res: TeamRes) {
    this.id = res.id
    this.name = res.name
  }
}
