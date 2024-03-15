import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
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
        ])
    })
    
    // Getters
    get name(){
        return this.signupFormGroup.get("name")!;
    }

    get email(){
        return this.signupFormGroup.get("email")!;
    }

    get password(){
        return this.signupFormGroup.get("password")!;
    }

    ngOnInit(): void {
        
    }

    constructor(private formBuilder: FormBuilder){}

    onSubmit(){

    }

    continueToGoogle(){

    }
}
