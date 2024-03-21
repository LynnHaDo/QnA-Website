import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseDashboardComponent } from './components/course-dashboard/course-dashboard.component';
import { CourseAssignmentComponent } from './components/course-assignment/course-assignment.component';
import { CourseRosterComponent } from './components/course-roster/course-roster.component';
import { AssignmentDetailComponent } from './components/assignment-detail/assignment-detail.component';

const routes: Routes = [
    {path: "courses/:id", component: CourseDetailComponent, children: [
        {path: "assignments", component: CourseAssignmentComponent, children: [
            {path: ":id", component: AssignmentDetailComponent}
        ]},
        {path: "roster", component: CourseRosterComponent},
        {path: "", component: CourseDashboardComponent}
    ]},
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
