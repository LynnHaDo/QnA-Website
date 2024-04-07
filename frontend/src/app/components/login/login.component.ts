import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginFormGroup: FormGroup = this.formBuilder.group({
        email: new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')
        ]),
        password: new FormControl('', [
            Validators.required
        ])
    })

    // Getters
    get email(){
        return this.loginFormGroup.get('email')!;
    }

    get password(){
        return this.loginFormGroup.get('password')!;
    }

    ngOnInit(){

    }

    constructor(private formBuilder: FormBuilder,
                private authService: RegisterService,
                private router: Router,
                private socialAuthService: SocialAuthService){}

    onSubmit(){
        this.authService.login(this.loginFormGroup.getRawValue()).subscribe(
            (res: any) => {
                this.authService.accessToken = res.token;
                this.router.navigate(['']);
                RegisterService.authEmitter.emit(true);
            }
        )
    }

    continueToGoogle(){
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
            googleUser => {
                this.authService.googleLogin(
                    {
                        token: googleUser.idToken
                    }
                ).subscribe(
                    (res: any) => {
                        this.authService.accessToken = res.token;
                        RegisterService.authEmitter.emit(true);
                        this.router.navigate(['/']);
                    }
                )
            }
        )
    }
}
