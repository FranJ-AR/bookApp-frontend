import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicSectionRoutingModule } from './public-section-routing.module';
import { PublicSectionComponent } from './public-section.component';


@NgModule({
  declarations: [PublicSectionComponent],
  imports: [
    CommonModule,
    PublicSectionRoutingModule
  ]
})
export class Orders1Module { }