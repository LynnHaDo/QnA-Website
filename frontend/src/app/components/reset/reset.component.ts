import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetService } from 'src/app/services/reset.service';
import { FormValidators } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
    cls = "";
    msg = "";
    email = "";
    storage: Storage = sessionStorage;

    resetFormGroup: FormGroup = this.formBuilder.group({
        password: new FormControl('', [
            Validators.required,
            FormValidators.checkWhitespace(8)
        ]),
        password_confirm: new FormControl('', [
            Validators.required
        ])
    })

    // Getters
    get password(){
        return this.resetFormGroup?.get("password")!;
    }

    get password_confirm(){
        return this.resetFormGroup?.get("password_confirm")!;
    }

    ngOnInit(): void {
        this.resetFormGroup!.get("password_confirm")?.addValidators(FormValidators.checkMismatch(this.resetFormGroup?.get("password")!));
        this.email = this.storage.getItem("email")!;
    }

    constructor(private formBuilder: FormBuilder, private resetServices: ResetService,
                private route: ActivatedRoute, private router: Router
    ){}

    onSubmit(){
        const formData = this.resetFormGroup.getRawValue();

        const token = this.route.snapshot.params['token'];
        
        const data = {
            ...formData,
            token: token
        }

        this.resetServices.reset(data).subscribe(
            {
                next: () => {
                    this.cls = "success";
                    this.msg = "Password successfully updated!";
                    this.router.navigate(['/log-in']); 
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
