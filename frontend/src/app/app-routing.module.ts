import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';

const routes: Routes = [
    {path: "courses/:id/roster", component: CourseDetailComponent},
    {path: "courses/:id/assignments", component: CourseDetailComponent},
    {path: "courses/:id/dashboard", component: CourseDetailComponent},
    {path: "courses/:id", component: CourseDetailComponent},
    {path: "search/:keyword", component: DashboardComponent},
    {path: "log-in", component: LoginComponent},
    {path: "sign-up", component: SignUpComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "", redirectTo: "/dashboard", pathMatch: "full"},
    {path: "**", redirectTo: "/dashboard", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
