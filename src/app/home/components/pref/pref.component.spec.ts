import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefComponent } from './pref.component';

describe('PrefComponent', () => {
  let component: PrefComponent;
  let fixture: ComponentFixture<PrefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
