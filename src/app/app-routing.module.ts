import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './admin-portal/login-admin/login-admin.component';
import { LoginAlumnComponent } from './alumn-portal/login-alumn/login-alumn.component';
import { AdminComponent } from './admin-portal/admin/admin.component';
import { AlumnComponent } from './alumn-portal/alumn/alumn.component';

const routes: Routes = [{ path: 'admin/login', component: LoginAdminComponent },
                        { path: 'alumn/login', component: LoginAlumnComponent },
                        { path: 'admin', component: AdminComponent },
                        { path: 'alumn', component: AlumnComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
