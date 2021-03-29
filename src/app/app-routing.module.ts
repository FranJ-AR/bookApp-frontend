import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { IndexComponent } from './index/index.component';
import { AuthComponent } from './auth/auth.component';
import { PrivateSectionComponent } from './private-section/private-section.component';
import { PublicSectionComponent } from './public-section/public-section.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  {
    path: 'login', component: AuthComponent, canActivate: [AuthGuard]
  },
  {
    path: 'register', component: AuthComponent, canActivate: [AuthGuard]
  },
  {
    path: 'public-section', loadChildren: () =>
      import('./public-section/public-section-routing.module').then(m => m.PublicSectionRoutingModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'private-section', component: PrivateSectionComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
