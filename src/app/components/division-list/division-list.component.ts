import { Component, OnInit } from '@angular/core';
import { DivisionService } from '@services/division.service';
import { Router } from '@angular/router';
import { Division } from '@models/division';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.scss']
})
export class DivisionListComponent implements OnInit {

  private divisions: Division[] = []

  constructor(
    private divisionService: DivisionService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.divisionService.getDivisions()
      .subscribe(divisions => {
        this.divisions = divisions
      })
  }

  onSelect(division: Division) {
    this.router.navigate(['/divisions', division.key])
  }

}
