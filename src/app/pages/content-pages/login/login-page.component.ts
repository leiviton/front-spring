import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import {AuthService} from "./auth.service";
import {environment} from "../../../../environments/environment";
import {UsersService} from "./users.service";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

    @ViewChild('f') loginForm: NgForm;

    user = {
        username:null,
        password:null
    };
    constructor(private router: Router,
        private route: ActivatedRoute, private auth: AuthService, private userService: UsersService) { }

    // On submit button click    
    login(e) {
        this.auth.showLoading();
        e.preventDefault();

        if (!this.user.username || !this.user.password) {
            return;
        }

        let data = {
            grant_type: 'password',
            client_id: environment.client_id,
            client_secret: environment.client_secret,
            username: this.user.username,
            password: this.user.password,
            scope: ''
        };

        this.auth.login(data)
            .then((res) => {
                localStorage.setItem('token',res.access_token);

                this.auth.setAccessToken();

                this.auth.getUser()
                    .then((res) => {
                        localStorage.setItem('user',JSON.stringify(res.data));
                        this.auth.hideLoading();
                        this.router.navigate(['/clients']);
                    });
            }).catch(() => {
                this.auth.hideLoading();
            });
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}