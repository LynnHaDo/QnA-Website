import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from 'src/app/validators/form-validators';

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

    constructor(private formBuilder: FormBuilder){}

    onSubmit(){
        console.log(this.loginFormGroup);
    }

    continueToGoogle(){
        
    }
}
