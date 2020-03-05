import { Injectable } from '@angular/core';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teams = [
    new Team("Pineapple Pizza"),
    new Team("SuperSmash"),
    new Team("Den Gode Herden"),
    new Team("Virvlarna"),
    new Team("Lurarna"),
    new Team("Dyrgriparna"),
  ]

  constructor() { }

  getTeams(): Promise<Team[]> {
    return Promise.resolve(this.teams)
  }
}
