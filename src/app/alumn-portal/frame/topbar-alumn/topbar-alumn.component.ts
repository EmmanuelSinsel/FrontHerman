import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-topbar-alumn',
  templateUrl: './topbar-alumn.component.html',
  styleUrls: ['./topbar-alumn.component.css']
})
export class TopbarAlumnComponent {
  constructor(private router: Router,
    private location: Location){}

  profile(){
    this.location.go('admin/profile');
  }
  dashboard(){
    this.location.go('admin');
  }
}
