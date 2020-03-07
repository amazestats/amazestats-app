import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../match';
import { Team } from '../team';
import { ResultService } from '../result.service';

interface ResultTableRow {
  position: number,
  teamName: string,
  matchesPlayed: number,
  matchesWon: number,
  matchesLost: number,
}

@Component({
  selector: 'app-division-table',
  templateUrl: './division-table.component.html',
  styleUrls: ['./division-table.component.scss']
})
export class DivisionTableComponent implements OnInit {

  @Input() matches: Match[]
  @Input() teams: Team[]

  displayedColumns: string[] = [
    'position',
    'teamName',
    'matchesPlayed',
    'matchesWon',
    'matchesLost',
  ]

  dataSource: ResultTableRow[] = []

  constructor(private resultService: ResultService) { }

  ngOnInit() {
    this.dataSource = this.teams.map(team => {
      return {
        position: 1,
        teamName: team.name,
        matchesPlayed:
          this.resultService.getMatchesPlayed(team, this.matches).length,
        matchesWon:
          this.resultService.getMatchesWon(team, this.matches).length,
        matchesLost:
          this.resultService.getMatchesLost(team, this.matches).length,
      }
    })
  }
}
