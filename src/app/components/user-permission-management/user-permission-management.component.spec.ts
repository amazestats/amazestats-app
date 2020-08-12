import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserPermissionManagementComponent } from './user-permission-management.component'

describe('UserPermissionManagementComponent', () => {
  let component: UserPermissionManagementComponent
  let fixture: ComponentFixture<UserPermissionManagementComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPermissionManagementComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPermissionManagementComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
