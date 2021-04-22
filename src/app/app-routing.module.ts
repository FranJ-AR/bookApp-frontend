import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAlreadyLogged } from './authAlreadyLogged.guard';
import { IndexComponent } from './index/index.component';
import { AuthComponent } from './auth/auth.component';
import { MyBooksComponent } from './myBooks/myBooks.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthNotLogged } from './authNotLogged.guard';
import { FaqComponent } from './faq/faq.component';
import { LibraryInfoComponent } from './library-info/library-info.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OnlineChatComponent } from './online-chat/online-chat.component';

const routes: Routes = [

  { path: '', redirectTo: 'index', pathMatch: 'full' },
 
  { path: 'index', component: IndexComponent },
  {
    path: 'login', component: AuthComponent, canActivate: [AuthAlreadyLogged]
  },
  {
    path: 'register', component: AuthComponent, canActivate: [AuthAlreadyLogged]
  },
  /*{
    path: 'public-section', loadChildren: () =>
      import('./public-section/public-section-routing.module').then(m => m.PublicSectionRoutingModule),
      canActivate: [AuthGuard]
  },*/

  {
    path: 'my-books', component: MyBooksComponent, canActivate: [AuthNotLogged]

  },

  {
    path: 'faq', component: FaqComponent

  },

  {
    path: 'library-info', component: LibraryInfoComponent

  },

  {
    path: 'about-us', component: AboutUsComponent

  },

  {
    path: 'online-chat', component: OnlineChatComponent

  },

  {
    path: '**', component:NotfoundComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
