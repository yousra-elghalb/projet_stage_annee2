import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOperationsPaiementComponent } from './list-operations-paiement.component';

describe('ListOperationsPaiementComponent', () => {
  let component: ListOperationsPaiementComponent;
  let fixture: ComponentFixture<ListOperationsPaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOperationsPaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOperationsPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
