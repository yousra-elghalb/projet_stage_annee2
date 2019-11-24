import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateModaliteComponent } from './dialog-update-modalite.component';

describe('DialogUpdateModaliteComponent', () => {
  let component: DialogUpdateModaliteComponent;
  let fixture: ComponentFixture<DialogUpdateModaliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUpdateModaliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateModaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
