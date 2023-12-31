import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  
  constructor(private router: Router,
    private location: Location){}

  profile(){
    this.location.go('admin/profile');
  }
  dashboard(){
    this.location.go('admin');
  }
}
