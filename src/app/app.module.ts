import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { LoginAdminComponent } from './admin-portal/login-admin/login-admin.component';
import { LoginAlumnComponent } from './alumn-portal/login-alumn/login-alumn.component';
import { AdminComponent } from './admin-portal/admin/admin.component';
import { AlumnComponent } from './alumn-portal/alumn/alumn.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TopbarComponent } from './topbar/topbar.component';
import { AuthorsComponent } from './admin-portal/authors/authors.component';
import { BooksComponent } from './admin-portal/books/books.component';
import { GeneresComponent } from './admin-portal/generes/generes.component';
import { LoansComponent } from './admin-portal/loans/loans.component';
import { ReservesComponent } from './admin-portal/reserves/reserves.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthInterceptorService } from 'src/services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    LoginAlumnComponent,
    AdminComponent,
    AlumnComponent,
    TopbarComponent,
    AuthorsComponent,
    BooksComponent,
    GeneresComponent,
    LoansComponent,
    ReservesComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule, 
    MatButtonModule]
  ,
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  url: string = "http://localhost:8000/api"

  constructor(){
    
  }
}
