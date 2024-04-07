import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { ResetService } from 'src/app/services/reset.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
    cls = "";
    msg = "";
    storage: Storage = sessionStorage;

    forgotFormGroup: FormGroup = this.formBuilder.group({
        email: new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')
        ])
    })

    // Getters
    get email(){
        return this.forgotFormGroup.get('email')!;
    }

    ngOnInit(){

    }

    constructor(private formBuilder: FormBuilder, private resetServices: ResetService){}

    onSubmit(){
        this.resetServices.forgot(this.forgotFormGroup.getRawValue()).subscribe(
            {
                next: () => {
                    this.cls = "success";
                    this.msg = "Email was sent!";
                    console.log(this.forgotFormGroup.get('email')!.value);
                    this.storage.setItem("email", this.forgotFormGroup.get('email')!.value);
                },
                error: () => {
                    this.cls = "danger";
                    this.msg = "Error occured";
                }
            }
        )
    }

    continueToGoogle(){
        
    }
}
