export interface SeasonRes {
  id: number
  name: string
  key: string
  division: number
}

export class Season {
  id: number
  name: string
  key: string
  division: number

  constructor(res: SeasonRes) {
    this.id = res.id
    this.name = res.name
    this.key = res.key
    this.division = res.division
  }
}
