import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5><i class="fas fa-users me-2"></i>Customers Management</h5>
            </div>
            <div class="card-body">
              <p>Customers management functionality coming soon...</p>
              <button class="btn btn-info">Add New Customer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container-fluid {
      padding: 2rem;
    }
  `]
})
export class CustomersComponent {}
