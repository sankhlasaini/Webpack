import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from './../../../services/profile.service';
import { MdSnackBar } from '@angular/material';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [
    trigger('bgImgTrigger', [
      transition('* => *', [
        animate(500, keyframes([
          style({ opacity: 0, transform: 'translateX(50px)', offset: 0 }),
          style({ opacity: .75, transform: 'translateX(-10px)', offset: .75 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
        ]))
      ])
    ])
  ]
})
export class SignUpComponent implements OnInit {

  gender = [
    { view: 'Male', value: 'm' },
    { view: 'Female', value: 'f' }
  ];

  userExist = false;
  loading = false;

  public signUpForm: FormGroup;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router,
    private ProfileService: ProfileService, public snackBar: MdSnackBar) {

    this.signUpForm = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/)]],
      gender: ['', [Validators.required]],
      dob: '',
      profilePic: '',
      mob: ''
    });
  }

  ngOnInit() { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  signUp() {
    this.loading = true;
    this.ProfileService.createAccount(this.signUpForm.value).subscribe((res) => {
      console.log('this is for sign up -->>', res);
      if (res.msg.success) {
        this.openSnackBar('Successfully Registered', 'PLEASE LOGIN');
        this.router.navigate(['/login']);
      }
      this.loading = false;
    });
  }

  checkEmail(email) {
    this.userExist = false;
    if (email) {
      this.ProfileService.checkEmail(email).subscribe((res) => {
        if (res.data.length > 0) {
          this.userExist = true;
        }
      });
    }
  }
}
