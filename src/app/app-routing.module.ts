import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { IndexComponent } from './index/index.component';
import { AuthComponent } from './auth/auth.component';
import { PrivateSectionComponent } from './private-section/private-section.component';
import { PublicSectionComponent } from './public-section/public-section.component';
import { MyBooksComponent } from './my-books/my-books.component';

const routes: Routes = [
 
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
    path: 'my-books', component: MyBooksComponent

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
