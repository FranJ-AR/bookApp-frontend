import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Orders1Component } from './orders1.component';

const routes: Routes = [{ path: '', component: Orders1Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Orders1RoutingModule { }
