import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule { }