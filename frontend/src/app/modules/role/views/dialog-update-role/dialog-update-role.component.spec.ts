import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateRoleComponent } from './dialog-update-role.component';

describe('DialogUpdateRoleComponent', () => {
  let component: DialogUpdateRoleComponent;
  let fixture: ComponentFixture<DialogUpdateRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUpdateRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
