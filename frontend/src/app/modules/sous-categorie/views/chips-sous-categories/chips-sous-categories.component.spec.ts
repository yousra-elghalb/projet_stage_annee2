import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsSousCategoriesComponent } from './chips-sous-categories.component';

describe('ChipsSousCategoriesComponent', () => {
  let component: ChipsSousCategoriesComponent;
  let fixture: ComponentFixture<ChipsSousCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsSousCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsSousCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
