import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  query: any;

  constructor(private router: Router) { }

  navigateToSearch(query: any): void {
    this.router.navigate([ 'search' , query ]);
  }
}
