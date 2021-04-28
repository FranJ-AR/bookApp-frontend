import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthAlreadyLogged } from '../guards/authAlreadyLogged.guard';
import { IndexComponent } from './index/index.component';
import { AuthInterceptorService } from '../services/auth-interceptor.service';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthComponent } from './auth/auth.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookDetailsComponent } from './book-details/book-details.component';
import { MyBooksComponent } from './myBooks/myBooks.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FaqComponent } from './faq/faq.component';
import { LibraryInfoComponent } from './library-info/library-info.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OnlineChatComponent } from './online-chat/online-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    IndexComponent,
    FooterComponent,
    NavbarComponent,
    BookDetailsComponent,
    MyBooksComponent,
    NotfoundComponent,
    FaqComponent,
    LibraryInfoComponent,
    AboutUsComponent,
    OnlineChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    
  ],
  providers: [AuthAlreadyLogged, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
