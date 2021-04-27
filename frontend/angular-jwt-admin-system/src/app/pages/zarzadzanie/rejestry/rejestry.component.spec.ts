import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejestryComponent } from './rejestry.component';

describe('RejestryComponent', () => {
  let component: RejestryComponent;
  let fixture: ComponentFixture<RejestryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejestryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejestryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
