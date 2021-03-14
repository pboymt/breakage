import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
// import { DocumentViewer2Component } from './document-viewer2/document-viewer2.component';
import { DocumentComponent } from './document.component';
import { DocumentTabsComponent } from './document-tabs/document-tabs.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { IconModule } from '../icon/icon.module';
import { NgxExtendedPdfViewerModule, NgxExtendedPdfViewerComponent } from 'ngx-extended-pdf-viewer';
// import { PdfModule } from '../pdf/pdf.module';
// DocumentViewerComponent
@NgModule({
  declarations: [DocumentViewerComponent, DocumentComponent, DocumentTabsComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    PdfViewerModule,
    IconModule,
    NgxExtendedPdfViewerModule
    // PdfModule
  ],
  exports: [DocumentComponent, DocumentViewerComponent,]  // DocumentViewerComponent
})
export class DocumentModule { }
