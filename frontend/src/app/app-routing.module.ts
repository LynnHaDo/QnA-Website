import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
    {path: "log-in", component: LoginComponent},
    {path: "sign-up", component: SignUpComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "", redirectTo: "log-in", pathMatch: "full"},
    {path: "**", redirectTo: "", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
