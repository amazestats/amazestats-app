import { Injectable } from '@angular/core';
import { Match } from '@models/match';
import { Team } from '@models/team';
import { Set } from '@models/set'

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor() { }

  getMatchesPlayed(team: Team, matches: Match[]): Match[] {
    return matches.filter(
      match =>
        match.sets.length > 0 &&
        (match.awayTeam == team.id ||
          match.homeTeam == team.id))
  }

  getMatchesWon(team: Team, matches: Match[]): Match[] {
    return this.getMatchesPlayed(team, matches)
      .filter(match => this.getMatchWinner(match) == team.id)
  }

  getMatchesLost(team: Team, matches: Match[]): Match[] {
    return this.getMatchesPlayed(team, matches)
      .filter(matchPlayed => this.getMatchesWon(team, matches)
        .find(matchWon => matchWon.id == matchPlayed.id) == undefined)
  }

  getMatchWinner(match: Match): number {
    const winner = match.sets
      .map(set => this.getSetWinner(set))
      .reduce((a, b) => a + b, 0)

    if (winner > 0) { return match.homeTeam }
    if (winner < 0) { return match.awayTeam }

    throw Error('Match does not have a winner.')
  }

  getSetWinner(set: Set): number {
    if (set.homeScore > set.awayScore) { return 1 }
    if (set.awayScore > set.homeScore) { return -1 }

    // Might want to look this over and throw an error instead if we find that
    // the result may have bad input (which is rather likely atm).
    return 0
  }

  getSetsWon(team: Team, matches: Match[]): number {
    let count = 0
    matches.forEach(match => {
      match.sets.forEach(set => {
        const winner = this.getSetWinner(set)
        if (winner == 1 && match.homeTeam == team.id ||
          winner == -1 && match.awayTeam == team.id) {
          count++
        }
      })
    })
    return count
  }

  getSetsLost(team: Team, matches: Match[]): number {
    return [].concat(...matches.map(match => match.sets)
    ).length - this.getSetsWon(team, matches)
  }
}
