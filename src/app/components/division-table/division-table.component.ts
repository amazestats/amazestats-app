import { Component, OnInit, ViewChild } from '@angular/core';
import { Match } from '@models/match';
import { Team } from '@models/team';
import { ResultService } from '@services/result.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DivisionService } from '@services/division.service'

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

  private key: string
  private matches: Match[]
  private teams: Team[]

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

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService,
    private divisionService: DivisionService,
  ) { }

  ngOnInit() {
    this.key = this.route.parent.snapshot.paramMap.get('key')

    this.divisionService.getDivisionByKey(this.key)
      .subscribe(division => {
        this.teams = division.teams
        this.matches = division.matches

        this.setupDataSource()
      })

  }

  setupDataSource() {
    this.dataSource = new MatTableDataSource(
      this.teams.map(team => {
        const matches = this.matches
          .filter(match =>
            match.homeTeam == team.id ||
            match.awayTeam == team.id)
        const matchesWon =
          this.resultService.getMatchesWon(team, matches).length

        return {
          position: 1,
          teamName: team.name,
          matchesPlayed:
            this.resultService.getMatchesPlayed(team, matches).length,
          matchesWon,
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
