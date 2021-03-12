import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Orders1RoutingModule } from './orders1-routing.module';
import { Orders1Component } from './orders1.component';


@NgModule({
  declarations: [Orders1Component],
  imports: [
    CommonModule,
    Orders1RoutingModule
  ]
})
export class Orders1Module { }
