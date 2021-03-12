import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicSectionComponent } from './public-section.component';

const routes: Routes = [{ path: '', component: PublicSectionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicSectionRoutingModule { }