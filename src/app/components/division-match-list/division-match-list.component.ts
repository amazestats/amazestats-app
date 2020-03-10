import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DivisionService } from '@services/division.service';
import { Team } from '@models/team';
import { Match } from '@models/match';

@Component({
  selector: 'app-division-match-list',
  templateUrl: './division-match-list.component.html',
  styleUrls: ['./division-match-list.component.scss']
})
export class DivisionMatchListComponent implements OnInit {

  private key: string
  private teams: Team[] = []
  private matches: Match[] = []

  constructor(
    private route: ActivatedRoute,
    private divisionService: DivisionService,
  ) { }

  ngOnInit() {
    this.key = this.route.parent.snapshot.paramMap.get('key')

    this.divisionService.getDivisionByKey(this.key)
      .subscribe(division => {
        this.teams = division.teams
        this.matches = division.matches
      })
  }
}
