import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeaderSearchComponent } from './sub-header-search.component';

describe('SubHeaderSearchComponent', () => {
  let component: SubHeaderSearchComponent;
  let fixture: ComponentFixture<SubHeaderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubHeaderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHeaderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
