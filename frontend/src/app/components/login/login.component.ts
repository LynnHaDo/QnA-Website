import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

    ngOnInit(){

    }

    constructor(private formBuilder: FormBuilder){}

    onSubmit(){

    }

    continueToGoogle(){
        
    }
}
