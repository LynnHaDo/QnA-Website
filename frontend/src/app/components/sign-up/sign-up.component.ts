import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from 'src/app/validators/form-validators';
import { env } from '../../environment/env.development'
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    private baseUrl = `${env.registerAPI}`;

    signupFormGroup: FormGroup = this.formBuilder.group({
        name: new FormControl('', [
            Validators.required,
            FormValidators.checkWhitespace(2)
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')
        ]),
        password: new FormControl('', [
            Validators.required,
            FormValidators.checkWhitespace(8)
        ]),
        password_confirm: new FormControl('', [
            Validators.required
        ])
    })
    
    // Getters
    get name(){
        return this.signupFormGroup?.get("name")!;
    }

    get email(){
        return this.signupFormGroup?.get("email")!;
    }

    get password(){
        return this.signupFormGroup?.get("password")!;
    }

    get password_confirm(){
        return this.signupFormGroup?.get("password_confirm")!;
    }

    ngOnInit(): void {
        this.signupFormGroup!.get("password_confirm")?.addValidators(FormValidators.checkMismatch(this.signupFormGroup?.get("password")!))
    }

    constructor(private formBuilder: FormBuilder, 
                private http: HttpClient, 
                private router: Router,
                private authService: RegisterService){}

    onSubmit(){
        this.authService.register(this.signupFormGroup.getRawValue()).subscribe(
            () => {
                this.router.navigate(['/log-in'])
            }
        )
    }

    continueToGoogle(){

    }
}
