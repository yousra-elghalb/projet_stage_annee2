import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogIframePeimentComponent } from './dialog-iframe-peiment.component';

describe('DialogIframePeimentComponent', () => {
  let component: DialogIframePeimentComponent;
  let fixture: ComponentFixture<DialogIframePeimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogIframePeimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogIframePeimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
