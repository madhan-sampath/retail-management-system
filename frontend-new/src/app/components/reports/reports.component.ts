import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5><i class="fas fa-chart-bar me-2"></i>Reports & Analytics</h5>
            </div>
            <div class="card-body">
              <p>Reports and analytics functionality coming soon...</p>
              <button class="btn btn-warning">Generate Report</button>
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
export class ReportsComponent {}
