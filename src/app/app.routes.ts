import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/dashboard/main/main.component';
import { UserComponent } from './components/dashboard/user/user.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, children: [
        { path: '', component: MainComponent },
        { path: 'users', component: UserComponent }
    ]},
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
