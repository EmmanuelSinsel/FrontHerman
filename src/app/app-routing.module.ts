import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './admin-portal/login-admin/login-admin.component';
import { LoginAlumnComponent } from './alumn-portal/login-alumn/login-alumn.component';
import { AdminComponent } from './admin-portal/admin/admin.component';
import { AlumnComponent } from './alumn-portal/alumn/alumn.component';
import { AuthorsComponent } from './admin-portal/authors/authors.component';
import { BooksComponent } from './admin-portal/books/books.component';
import { GeneresComponent } from './admin-portal/generes/generes.component';
import { LoansComponent } from './admin-portal/loans/loans.component';
import { ReservesComponent } from './admin-portal/reserves/reserves.component';
import { ReturnsComponent } from './admin-portal/returns/returns.component';


const routes: Routes = [{ path: 'admin/login',    component: LoginAdminComponent },
                        { path: 'alumn/login',    component: LoginAlumnComponent },
                        { path: 'admin',    component: AdminComponent },
                        { path: 'admin/alumn',    component: AdminComponent },
                        { path: 'admin/authors',  component: AdminComponent },
                        { path: 'admin/books',    component: AdminComponent },
                        { path: 'admin/generes',  component: AdminComponent },
                        { path: 'admin/loans',    component: AdminComponent },
                        { path: 'admin/reserves', component: AdminComponent },
                        { path: 'admin/returns',  component: AdminComponent },
                        { path: 'admin/alumn',    component: AdminComponent },
                        { path: 'admin/alumn',    component: AdminComponent },
                        { path: 'admin/alumn',    component: AdminComponent },
                        { path: 'admin/alumn',    component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
