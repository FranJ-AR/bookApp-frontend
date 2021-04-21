import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrivateSectionComponent } from './private-section/private-section.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthAlreadyLogged } from './authAlreadyLogged.guard';
import { IndexComponent } from './index/index.component';
import { PublicSectionRoutingModule } from './public-section/public-section-routing.module';
import { AuthInterceptorService } from './auth-interceptor.service';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthComponent } from './auth/auth.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookDetailsComponent } from './book-details/book-details.component';
import { MytestsComponent } from './mytests/mytests.component';
import { MyBooksComponent } from './myBooks/myBooks.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PrivateSectionComponent,
    IndexComponent,
    FooterComponent,
    NavbarComponent,
    BookDetailsComponent,
    MytestsComponent,
    MyBooksComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    PublicSectionRoutingModule,
    FontAwesomeModule,
    
  ],
  providers: [AuthAlreadyLogged, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
