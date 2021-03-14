import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
// import { DocumentViewer2Component } from './document-viewer2/document-viewer2.component';

const routes: Routes = [
  {
    path: 'doc/:session',
    component: DocumentViewerComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
