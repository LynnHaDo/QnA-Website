import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
    isAuthenticated = false;
    message: string = '';

    constructor(private authService: RegisterService,
                private router: Router){}

    ngOnInit(): void {
        this.authService.user().subscribe(
            {
                next: (res: any) => {
                    this.message = res['name'];
                    RegisterService.authEmitter.emit(true); // authenticated
                },

                error: (err) => {
                    this.message = "Please log in";
                    RegisterService.authEmitter.emit(false);
                }
            }
        )

        RegisterService.authEmitter.subscribe(authenticated => {
            this.isAuthenticated = authenticated
        })
    }

    logOut(){
        this.authService.logout().subscribe(() => {
            this.authService.accessToken = '';
            RegisterService.authEmitter.emit(false); 
            this.router.navigate(['/log-in'])
        })
    }
}
