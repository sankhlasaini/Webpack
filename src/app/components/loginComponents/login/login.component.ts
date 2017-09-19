import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { MdSnackBar } from '@angular/material';
// import { LoginService } from 'src/app/services/login.service';
import { LoginService } from './../../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('bgImgTrigger', [
      transition('void => *', [
        animate(500, keyframes([
          style({ opacity: 0, transform: 'translateX(-50px)', offset: 0 }),
          style({ opacity: .75, transform: 'translateX(10px)', offset: .75 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
        ]))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  loading = false;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router,
    // tslint:disable-next-line:max-line-length
    private LoginService: LoginService, public snackBar: MdSnackBar) {

    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/)]],
    });
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  login() {
    this.loading = true;
    this.LoginService.login(this.loginForm)
      .subscribe((loginResponse) => {
        console.log('this is in login comp ->>', loginResponse);
        if (loginResponse.success) {
          this.openSnackBar('Welcome', this.loginForm.value.email);
          this.router.navigate(['/']);
        } else {
          this.openSnackBar('Email OR Password Wrong', 'Please Try Again');
        }
        this.loading = false;
      });
  }

  // socialLogin(provider) {
  //   this.LoginService.socialLogin(provider);
  // }
}
