import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DivisionMatchListComponent } from './division-match-list.component'

describe('DivisionMatchListComponent', () => {
  let component: DivisionMatchListComponent
  let fixture: ComponentFixture<DivisionMatchListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionMatchListComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionMatchListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
