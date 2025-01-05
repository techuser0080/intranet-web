import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/dashboard/main/main.component';
import { UserComponent } from './components/dashboard/user/user.component';
import { RegisterUserComponent } from './components/dashboard/user/register/register.component';
import { FolderComponent } from './components/dashboard/folder/folder.component';
import { RegisterFolderComponent } from './components/dashboard/folder/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, children: [
        { path: '', component: MainComponent },
        { path: 'users', component: UserComponent },
        { path: 'userRegister', component: RegisterUserComponent },
        { path: 'folders', component: FolderComponent },
        { path: 'folderRegister', component: RegisterFolderComponent}
    ]},
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
