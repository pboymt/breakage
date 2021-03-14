import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentViewer2Component } from './document-viewer2.component';

describe('DocumentViewerComponent', () => {
  let component: DocumentViewer2Component;
  let fixture: ComponentFixture<DocumentViewer2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentViewer2Component ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentViewer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
