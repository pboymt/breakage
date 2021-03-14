import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDirective } from './icon.directive';



@NgModule({
  declarations: [IconDirective],
  imports: [
    CommonModule
  ],
  exports: [IconDirective]
})
export class IconModule { }
