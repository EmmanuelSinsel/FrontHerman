import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './admin-portal/login-admin/login-admin.component';
import { LoginAlumnComponent } from './alumn-portal/login-alumn/login-alumn.component';
import { AdminComponent } from './admin-portal/admin/admin.component';
import { AlumnComponent } from './alumn-portal/alumn/alumn.component';
import { AuthorsComponent } from './admin-portal/admin/authors/authors.component';
import { BooksComponent } from './admin-portal/admin/books/books.component';
import { GeneresComponent } from './admin-portal/admin/generes/generes.component';
import { LoansComponent } from './admin-portal/admin/loans/loans.component';
import { ReservesComponent } from './admin-portal/admin/reserves/reserves.component';
import { ReturnsComponent } from './admin-portal/admin/returns/returns.component';


const routes: Routes = [{ path: 'admin/login', component: LoginAdminComponent },
                        { path: 'alumn/login', component: LoginAlumnComponent },
                        { path: 'admin', component: AdminComponent },
                        { path: 'alumn', component: AlumnComponent },
                        { path: 'authors', component: AuthorsComponent },
                        { path: 'books', component: BooksComponent },
                        { path: 'generes', component: GeneresComponent },
                        { path: 'loans', component: LoansComponent },
                        { path: 'reserves', component: ReservesComponent },
                        { path: 'returns', component: ReturnsComponent },
                        { path: 'alumn', component: AlumnComponent },
                        { path: 'alumn', component: AlumnComponent },
                        { path: 'alumn', component: AlumnComponent },
                        { path: 'alumn', component: AlumnComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
