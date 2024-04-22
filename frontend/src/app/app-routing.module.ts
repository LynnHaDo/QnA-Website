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
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetComponent } from './components/reset/reset.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { authGuard } from './interceptors/auth.guard';
import { AssignmentSubmissionsComponent } from './components/assignment-submissions/assignment-submissions.component';
import { GradingAssignmentComponent } from './components/grading-assignment/grading-assignment.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';

const routes: Routes = [
    {path: "courses/:id/assignments/:assignmentId", canActivate: [authGuard], component: AssignmentDetailComponent, children: [
        {path: "", component: AssignmentSubmissionsComponent},
        {path: "grading-assignments", component: GradingAssignmentComponent},
        {path: "questions/:questionId", component: QuestionDetailComponent}
    ]},
    {path: "courses/:id", component: CourseDetailComponent, canActivate: [authGuard], children: [
        {path: "assignments", component: CourseAssignmentComponent},
        {path: "roster", component: CourseRosterComponent},
        {path: "", component: CourseDashboardComponent}
    ]},
    {path: "search/:keyword", component: DashboardComponent, canActivate: [authGuard]},
    {path: "reset-password/:token", component: ResetComponent},
    {path: "forgot-password", component: ForgotPasswordComponent},
    {path: "log-in", component: LoginComponent},
    {path: "sign-up", component: SignUpComponent},
    {path: "dashboard", component: DashboardComponent, canActivate: [authGuard]},
    {path: "", redirectTo: "/dashboard", pathMatch: "full"},
    {path: "**", redirectTo: "/dashboard", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
