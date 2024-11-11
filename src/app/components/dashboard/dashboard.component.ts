import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule, DashboardRoutingModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
