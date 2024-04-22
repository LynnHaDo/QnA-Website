import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxEditorComponent, NgxEditorModule } from 'ngx-editor';

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

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetComponent } from './components/reset/reset.component';

import { SocialLoginModule, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';

import googleAuthJson from "./environment/google_oauth_secret.json";
import { AssignmentSubmissionsComponent } from './components/assignment-submissions/assignment-submissions.component';
import { GradingAssignmentComponent } from './components/grading-assignment/grading-assignment.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';

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
    AssignmentDetailComponent,
    ForgotPasswordComponent,
    ResetComponent,
    AssignmentSubmissionsComponent,
    GradingAssignmentComponent,
    QuestionDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxEditorModule,
    NgbModule,
    ReactiveFormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(googleAuthJson.web.client_id,
                {
                    oneTapEnabled: false
                }
            ),
          }
        ]
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
