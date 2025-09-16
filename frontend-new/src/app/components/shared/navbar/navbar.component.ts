import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;

  constructor() { }

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
    
    if (this.isLoggedIn) {
      // TODO: Load user data from API
      this.user = {
        name: 'Admin User',
        email: 'admin@retail.com'
      };
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.user = null;
    // TODO: Navigate to login page
  }
}
