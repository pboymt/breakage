import { Component, Input, OnInit } from '@angular/core';
import {  } from 'pdfjs-dist';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {

  @Input()
  src: Uint8Array;

  constructor() { }

  ngOnInit(): void {
  }

}
