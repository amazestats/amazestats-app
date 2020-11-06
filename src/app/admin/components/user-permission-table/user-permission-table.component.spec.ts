import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserPermissionTableComponent } from './user-permission-table.component'

describe('UserPermissionListComponent', () => {
  let component: UserPermissionTableComponent
  let fixture: ComponentFixture<UserPermissionTableComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserPermissionTableComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPermissionTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
