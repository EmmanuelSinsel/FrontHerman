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
import { TopbarComponent } from './admin-portal/frame/topbar/topbar.component';
import { AuthorsComponent } from './admin-portal/main-functions/authors/authors.component';
import { BooksComponent } from './admin-portal/main-functions/books/books.component';
import { GeneresComponent } from './admin-portal/main-functions/generes/generes.component';
import { LoansComponent } from './admin-portal/main-functions/loans/loans.component';
import { ReservesComponent } from './admin-portal/main-functions/reserves/reserves.component';
import { SidebarComponent } from './admin-portal/frame/sidebar/sidebar.component';
import { AuthInterceptorService } from 'src/services/auth-interceptor.service';
import { HistorialComponent } from './admin-portal/admin-functions/historial/historial.component';
import { AdvicesComponent } from './admin-portal/admin-functions/advices/advices.component';
import { AdminAccountsComponent } from './admin-portal/admin-functions/admin-accounts/admin-accounts.component';
import { AlumnAccountsComponent } from './admin-portal/admin-functions/alumn-accounts/alumn-accounts.component';
import { LogsComponent } from './admin-portal/admin-functions/logs/logs.component';
import { StatisticsComponent } from './admin-portal/admin-functions/statistics/statistics.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { LogoutAdminComponent } from './admin-portal/logout-admin/logout-admin.component';
import { TopbarAlumnComponent } from './alumn-portal/frame/topbar-alumn/topbar-alumn.component';
import { SidebarAlumnComponent } from './alumn-portal/frame/sidebar-alumn/sidebar-alumn.component';
import { SlopesComponent } from './admin-portal/main-functions/slopes/slopes.component';
import { HomeComponent } from './alumn-portal/home/home.component';
import { LoansAlumnComponent } from './alumn-portal/loans-alumn/loans-alumn.component';
import { BooksAlumnComponent } from './alumn-portal/books-alumn/books-alumn.component';
import { AccountComponent } from './alumn-portal/account/account.component';
import { LibrariesComponent } from './admin-portal/admin-functions/libraries/libraries.component';


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
    HistorialComponent,
    AdvicesComponent,
    AdminAccountsComponent,
    AlumnAccountsComponent,
    LogsComponent,
    StatisticsComponent,
    LogoutAdminComponent,
    TopbarAlumnComponent,
    SidebarAlumnComponent,
    SlopesComponent,
    HomeComponent,
    LoansAlumnComponent,
    BooksAlumnComponent,
    AccountComponent,
    LibrariesComponent
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
    MatButtonModule,
    CanvasJSAngularChartsModule
  ],
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
