import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, public snackBar: MdSnackBar) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public canActivate() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.openSnackBar('You are not Logged in', 'Please Login');

    this.router.navigate(['/login']);
    return false;
  }
}
