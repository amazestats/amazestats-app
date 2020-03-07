import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Match } from '../match';
import { Team } from '../team';
import { ResultService } from '../result.service';
import { MatSort, MatTableDataSource } from '@angular/material';

interface TeamResult {
  position: number,
  teamName: string,
  matchesPlayed: number,
  matchesWon: number,
  matchesLost: number,
  points: number,
  setsWon: number,
  setsLost: number,
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
    'points',
    'matchesWon',
    'matchesLost',
    'sets',
  ]

  dataSource: MatTableDataSource<TeamResult>

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private resultService: ResultService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(
      this.teams.map(team => {
        let matches = this.matches
          .filter(match =>
            match.homeTeam == team.id ||
            match.awayTeam == team.id)
        let matchesWon =
          this.resultService.getMatchesWon(team, matches).length

        return {
          position: 1,
          teamName: team.name,
          matchesPlayed:
            this.resultService.getMatchesPlayed(team, matches).length,
          matchesWon: matchesWon,
          matchesLost:
            this.resultService.getMatchesLost(team, matches).length,
          points:
            matchesWon * 3, // TODO: Move logic to result service
          setsWon: this.resultService.getSetsWon(team, matches),
          setsLost: this.resultService.getSetsLost(team, matches),
        }
      }))

    this.dataSource.sort = this.sort;

  }
}
