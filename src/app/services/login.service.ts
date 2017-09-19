import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { AuthService } from 'angular2-social-login';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { ProfileService } from './profile.service';

@Injectable()
export class LoginService {
  public token: string;

  constructor(private _http: Http, private profileService: ProfileService,
    private router: Router, public snackBar: MdSnackBar) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  // login user
  login(userForm) {
    return this._http.post('/authentication', userForm.value)
      .map((res: Response) => {
        const loginRes = res.json();
        const token = res.json() && res.json().authToken;
        if (loginRes && loginRes.authToken) {
          localStorage.setItem('currentUser', JSON.stringify({ username: userForm.value.email, token: token }));
        }
        return res.json();
      });
  }

  // logout user
  logout() {
    this.token = null;
    localStorage.removeItem('currentUser');
    // this._auth.logout().subscribe((res) => {
    //   console.log('logged out by social :: ', res);
    // });
  }

  // social login using npm
  // socialLogin(provider) {
  //   this._auth.login(provider).subscribe((res) => {
  //     console.log(res);

  //     if (res && res['token']) {
  //       this.profileService.checkEmail(res['email']).subscribe((checkEmailRes) => {
  //         console.log(checkEmailRes);
  //         const profile = {
  //           name: res['name'],
  //           email: res['email'],
  //           password: res['email'],
  //           profilePic: res['image']
  //         };
  //         if (checkEmailRes.data.length === 0) {
  //           this.profileService.createAccount(profile).subscribe((newUserRes) => {
  //             if (newUserRes.msg.success) {
  //               localStorage.setItem('currentUser', JSON.stringify(
  //                 { username: profile.email, token: res['token'], provider: res['provider'] }
  //               ));
  //               this.openSnackBar('Welcome', profile['email']);
  //               this.router.navigate(['/']);
  //             } else {
  //               this.openSnackBar('Email OR Password Wrong', 'Please Try Again');
  //             }
  //           });
  //         } else {
  //           localStorage.setItem('currentUser', JSON.stringify(
  //             { username: profile.email, token: res['token'], provider: res['provider'] }
  //           ));
  //           this.openSnackBar('Welcome', profile['email']);
  //           this.router.navigate(['/']);
  //         }
  //       });
  //     }
  //   });
  // }
}
