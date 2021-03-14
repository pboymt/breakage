import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { PrefComponent } from './components/pref/pref.component';
import { PrefGroupComponent } from './components/pref-group/pref-group.component';
import { PrefItemStringInputComponent } from './components/pref-item-string-input/pref-item-string-input.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [HomeComponent, PrefComponent, PrefGroupComponent, PrefItemStringInputComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, IconModule]
})
export class HomeModule { }
