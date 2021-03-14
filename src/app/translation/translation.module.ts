import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaiduService } from "./services";
import { TranslationComponent } from './translation.component';
import { ResizableModule } from 'angular-resizable-element';

@NgModule({
  declarations: [TranslationComponent],
  imports: [
    CommonModule,
    ResizableModule
  ],
  exports: [TranslationComponent],
  providers: []
})
export class TranslationModule { }
