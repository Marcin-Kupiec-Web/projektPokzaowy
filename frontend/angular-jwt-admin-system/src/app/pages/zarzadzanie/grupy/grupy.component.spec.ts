import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupyComponent } from './grupy.component';

describe('ZakladyComponent', () => {
  let component: GrupyComponent;
  let fixture: ComponentFixture<GrupyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
