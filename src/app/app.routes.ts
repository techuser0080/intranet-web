import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/dashboard/main/main.component';
import { UserComponent } from './components/dashboard/user/user.component';
import { RegisterUserComponent } from './components/dashboard/user/register/register.component';
import { FolderComponent } from './components/dashboard/folder/folder.component';
import { RegisterFolderComponent } from './components/dashboard/folder/register/register.component';
import { ConfigFolderComponent } from './components/dashboard/config-folder/config-folder.component';
import { ConfigPromptComponent } from './components/dashboard/config-prompt/config-prompt.component';
import { ReportResultComponent } from './components/dashboard/config-folder/report-result/report-result.component';
import { RegisterConfigFolderComponent } from './components/dashboard/config-folder/register/register.component';
import { RegisterPromptComponent } from './components/dashboard/config-prompt/register/register.component';
import { ReportComponent } from './components/dashboard/config-folder/report/report.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, children: [
        { path: '', component: MainComponent },
        { path: 'users', component: UserComponent },
        { path: 'userRegister', component: RegisterUserComponent },
        { path: 'folders', component: FolderComponent },
        { path: 'folderRegister', component: RegisterFolderComponent},
        { path: 'configfolders', component: ConfigFolderComponent },
        { path: 'configFolderRegister', component: RegisterConfigFolderComponent},
        { path: 'reportResult', component: ReportComponent },
        { path: 'prompts', component: ConfigPromptComponent },
        { path: 'promptRegister', component: RegisterPromptComponent}
    ]},
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
