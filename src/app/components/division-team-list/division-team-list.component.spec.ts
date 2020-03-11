import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DivisionTeamListComponent } from './division-team-list.component'

describe('DivisionTeamListComponent', () => {
  let component: DivisionTeamListComponent
  let fixture: ComponentFixture<DivisionTeamListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionTeamListComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionTeamListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
