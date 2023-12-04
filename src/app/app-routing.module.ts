import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './admin-portal/login-admin/login-admin.component';
import { LoginAlumnComponent } from './alumn-portal/login-alumn/login-alumn.component';
import { AdminComponent } from './admin-portal/admin/admin.component';
import { AlumnComponent } from './alumn-portal/alumn/alumn.component';



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
                        { path: 'admin/alumn-accounts',    component: AdminComponent },
                        { path: 'admin/statistics',        component: AdminComponent },
                        { path: 'admin/logs',              component: AdminComponent },
                        { path: 'alumn/login',             component: LoginAlumnComponent },
                        { path: 'alumn',                   component: AlumnComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
