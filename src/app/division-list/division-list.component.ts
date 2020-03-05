import { Component, OnInit } from '@angular/core';
import { DivisionService } from '../division.service';
import { Router } from '@angular/router';
import { Division } from '../division';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.scss']
})
export class DivisionListComponent implements OnInit {

  private divisions = []

  constructor(
    private divisionService: DivisionService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.divisionService.getDivisions()
      .then(divisions => {
        this.divisions = divisions
      })
      .catch(reason => {
        console.error(reason)
      })
  }

  onSelect(division: Division) {
    this.router.navigate(['/divisions', division.name])
  }

}
