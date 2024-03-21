import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseDashboardComponent } from './components/course-dashboard/course-dashboard.component';
import { CourseAssignmentComponent } from './components/course-assignment/course-assignment.component';
import { CourseRosterComponent } from './components/course-roster/course-roster.component';
import { AssignmentDetailComponent } from './components/assignment-detail/assignment-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    NotificationComponent,
    SearchBarComponent,
    CourseListComponent,
    LoginStatusComponent,
    CourseDetailComponent,
    CourseDashboardComponent,
    CourseAssignmentComponent,
    CourseRosterComponent,
    AssignmentDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
