import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats = {
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0
  };

  recentOrders: any[] = [];
  topProducts: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // TODO: Implement API calls to load dashboard data
    this.stats = {
      totalProducts: 150,
      totalOrders: 45,
      totalCustomers: 89,
      totalRevenue: 12500
    };

    this.recentOrders = [
      { id: 1, customer: 'John Doe', amount: 150.00, status: 'Completed' },
      { id: 2, customer: 'Jane Smith', amount: 75.50, status: 'Pending' },
      { id: 3, customer: 'Bob Johnson', amount: 200.00, status: 'Completed' }
    ];

    this.topProducts = [
      { name: 'Product A', sales: 25, revenue: 1250 },
      { name: 'Product B', sales: 18, revenue: 900 },
      { name: 'Product C', sales: 12, revenue: 600 }
    ];
  }
}
