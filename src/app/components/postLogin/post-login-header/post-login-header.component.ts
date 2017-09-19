import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { LoginService } from './../../../services/login.service';
import { ProfileService } from './../../../services/profile.service';
import { SharedService } from './../../../services/shared.service';

@Component({
  selector: 'app-post-login-header',
  templateUrl: './post-login-header.component.html',
  styleUrls: ['./post-login-header.component.css'],
})
export class PostLoginHeaderComponent implements OnInit {
  currentUser = {};
  userProfile;

  navList = [
    { name: 'Dashboard', icon: 'dashboard', routerLink: '/' },
    { name: 'My Account', icon: 'account_box', routerLink: '/profile' },
    { name: 'Check Pincode', icon: 'pin', routerLink: '/pincode' }
  ];

  profilePicLoc = './../../../../assets/images/profilePic/';

  constructor(private loginService: LoginService, private profileService: ProfileService,
    public snackBar: MdSnackBar, private router: Router, private sharedService: SharedService) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getProfile(this.currentUser);

    this.sharedService.sharedUserData$.subscribe(data => {
      // console.log('data from shared service: ', data.get('userProfile'));
      this.userProfile = data.get('userProfile');
    });
  }

  ngOnInit() { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getProfile(currentUser) {
    this.profileService.getProfile(currentUser).subscribe(res => {
      // console.log('get profile res :: ', res);
      this.userProfile = res.data[0];
      if (!this.userProfile.profilePic) {
        if (this.userProfile.personalInfo.gender === 'm') {
          this.userProfile.profilePic = this.profilePicLoc + 'male.png';
        } else if (this.userProfile.personalInfo.gender === 'f') {
          this.userProfile.profilePic = this.profilePicLoc + 'female.png';
        }
      }
      this.update();
    });
  }

  // update local data with shared service
  update() {
    this.sharedService.updateUserData('userProfile', this.userProfile);
    // this.data = this._myPartnerService.myPartnerList();
  }


  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
    this.openSnackBar('Successfully', 'Logged Out');
  }
}
