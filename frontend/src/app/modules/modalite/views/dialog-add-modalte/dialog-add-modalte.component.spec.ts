import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddModalteComponent } from './dialog-add-modalte.component';

describe('DialogAddModalteComponent', () => {
  let component: DialogAddModalteComponent;
  let fixture: ComponentFixture<DialogAddModalteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddModalteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddModalteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
