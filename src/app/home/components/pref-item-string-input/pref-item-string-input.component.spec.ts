import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefItemStringInputComponent } from './pref-item-string-input.component';

describe('PrefItemStringInputComponent', () => {
  let component: PrefItemStringInputComponent;
  let fixture: ComponentFixture<PrefItemStringInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefItemStringInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefItemStringInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
