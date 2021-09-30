import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MFileManagerComponent } from './m-file-manager.component';

describe('MFileManagerComponent', () => {
  let component: MFileManagerComponent;
  let fixture: ComponentFixture<MFileManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MFileManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MFileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
