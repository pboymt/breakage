import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefGroupComponent } from './pref-group.component';

describe('PrefGroupComponent', () => {
  let component: PrefGroupComponent;
  let fixture: ComponentFixture<PrefGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
