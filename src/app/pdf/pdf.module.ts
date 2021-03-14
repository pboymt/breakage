import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfComponent } from './pdf/pdf.component';



@NgModule({
  declarations: [PdfComponent],
  imports: [
    CommonModule
  ],
  exports: [PdfComponent]
})
export class PdfModule { }
