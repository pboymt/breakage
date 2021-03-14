import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { IconModule } from '../icon/icon.module';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { SharedModule } from '../shared/shared.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';



@NgModule({
  declarations: [MenuComponent, MenuButtonComponent, MenuListComponent, MenuItemComponent, MenuBarComponent],
  imports: [
    CommonModule,
    SharedModule,
    IconModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
