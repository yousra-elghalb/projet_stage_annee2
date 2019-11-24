import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateCategorieComponent } from './dialog-update-categorie.component';

describe('DialogUpdateCategorieComponent', () => {
  let component: DialogUpdateCategorieComponent;
  let fixture: ComponentFixture<DialogUpdateCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUpdateCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
