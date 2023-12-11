import { Component, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { CrudService } from 'src/services/crud.service';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  constructor(private router: Router,
              private location: Location,
              private crud: CrudService,
              private titleService:Title){}
  public index: Number = 0;
  button_focus = "side-button-selected"
  button_not_focus = "side-button"
  label_focus = "side-button-label-selected"
  label_not_focus = "side-button-label"
  master: string = ""
  ngOnInit(){
    this.titleService.setTitle("Bibliolibo");
    this.crud.get_admin_profile().subscribe(
      (res: any) => {
        console.log(res)
        this.master= res['profile']["master"]
        console.log(this.master)
      }
    );
  }
  route(index: number){
    this.index = index
    switch(index){
      case 1: {
        this.location.go("admin/loans");
        this.titleService.setTitle("Prestamos");
        break;
      }
      case 2: {
        this.location.go('admin/slopes');
        this.titleService.setTitle("Pendientes");
        break;
      }
      case 3: {
        this.location.go('admin/reserves');
        this.titleService.setTitle("Apartados");
        break;
      }
      case 4: {
        this.location.go('admin/books');
        this.titleService.setTitle("Libros");
        break;
      }
      case 5: {
        this.location.go('admin/authors');
        this.titleService.setTitle("Autores");
        break;
      }
      case 6: {
        this.location.go('admin/generes');
        this.titleService.setTitle("Categorias");
        break;
      }
      case 7: {
        this.location.go('admin/historial');
        this.titleService.setTitle("Historial");
        break;
      }
      case 8: {
        this.location.go('admin/advices');
        this.titleService.setTitle("Observaciones");
        break;
      }
      case 9: {
        this.location.go('admin/alumn-accounts');
        this.titleService.setTitle("Cuentas de Alumnos");
        break;
      }
      case 10: {
        this.location.go('admin/logs');
        this.titleService.setTitle("Registro de Acciones");
        break;
      }
      case 11: {
        this.titleService.setTitle("Dashboard");
        this.location.go('admin');
        break;
      }
      case 12: {
        this.location.go('admin/admin-accounts');
        this.titleService.setTitle("Cuentas de Administradores");
        break;
      }
      case 13: {
        this.location.go('admin/libraries');
        this.titleService.setTitle("Bibliotecas");
        break;
      }
    }
  }
}
