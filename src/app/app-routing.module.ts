import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './admin-portal/login-admin/login-admin.component';
import { LoginAlumnComponent } from './alumn-portal/login-alumn/login-alumn.component';
import { AdminComponent } from './admin-portal/admin/admin.component';



const routes: Routes = [{ path: 'admin/login',             component: LoginAdminComponent },
                        { path: 'admin',                   component: AdminComponent },
                        { path: 'admin/alumn',             component: AdminComponent },
                        { path: 'admin/authors',           component: AdminComponent },
                        { path: 'admin/books',             component: AdminComponent },
                        { path: 'admin/generes',           component: AdminComponent },
                        { path: 'admin/loans',             component: AdminComponent },
                        { path: 'admin/reserves',          component: AdminComponent },
                        { path: 'admin/returns',           component: AdminComponent },
                        { path: 'admin/historial',         component: AdminComponent },
                        { path: 'admin/advices',           component: AdminComponent },
                        { path: 'admin/admin-accounts',    component: AdminComponent },
                        { path: 'admin/alumn',             component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
