import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTabsComponent } from './document-tabs.component';

describe('DocumentTabsComponent', () => {
  let component: DocumentTabsComponent;
  let fixture: ComponentFixture<DocumentTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
