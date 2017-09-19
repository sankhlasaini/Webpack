import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from './../../../services/shared.service';
import { ProfileService } from './../../../services/profile.service';
import { trigger, state, style, transition, animate, keyframes, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('animateLeft', [
      transition('* => *', [
        animate(500, keyframes([
          style({ opacity: .5, transform: 'translateX(100px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(-10px)', offset: .75 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
        ]))
      ])
    ]),
    trigger('animateRight', [
      transition('* => *', [
        animate(500, keyframes([
          style({ opacity: .5, transform: 'translateX(-100px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(10px)', offset: .75 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
        ]))
      ])
    ])
  ]
})

export class ProfileComponent implements OnInit {
  editForm: FormGroup;
  editMode = false;
  maxDate = new Date('2000-12-31'); // Dec 31 2000
  minDate = new Date('1970-01-01'); // Jan 1 1970
  dob: {};
  userProfile: any;
  currentUser: any;
  profilePicLoc = './../../../../assets/images/profilePic/';
  testing = 1;
  profileListItem = [];

  constructor( @Inject(FormBuilder) public fb: FormBuilder, private sharedService: SharedService,
    private profileService: ProfileService, public snackBar: MdSnackBar, ) {
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

  // get profile of current user
  getProfile(currentUser) {
    this.profileService.getProfile(currentUser).subscribe(res => {
      this.userProfile = res.data[0];
      if (!this.userProfile.profilePic) {
        if (this.userProfile.personalInfo.gender === 'm') {
          this.userProfile.profilePic = this.profilePicLoc + 'male.png';
        } else if (this.userProfile.personalInfo.gender === 'f') {
          this.userProfile.profilePic = this.profilePicLoc + 'female.png';
        }
      }
      this.setProfileListItem();
      this.createForm();
      this.update();
    });
  }

  // set list item to display
  setProfileListItem() {
    // console.log(this.userProfile);
    const personalInfo = this.userProfile.personalInfo;
    this.profileListItem = [
      { icon: 'person', value: personalInfo.name, key: 'name', placeholder: 'Name', formControlName: 'name' },
      { icon: 'email', value: personalInfo.email, key: 'email', placeholder: 'Email', formControlName: 'email' },
      { icon: 'phone', value: personalInfo.mob, key: 'mob', placeholder: 'Mobile', formControlName: 'mob' },
    ];

    this.dob = { icon: 'cake', value: new Date(personalInfo.dob), key: 'dob', formControlName: 'dob' };
  }

  // create form group
  createForm() {
    // console.log('--->>>', this.userProfile);
    this.editForm = this.fb.group({
      name: this.userProfile.personalInfo.name,
      email: { value: this.userProfile.personalInfo.email, disabled: true },
      dob: new Date(this.userProfile.personalInfo.dob),
      mob: this.userProfile.personalInfo.mob,
      gender: this.userProfile.personalInfo.gender
    });

  }

  // update local data with shared service
  update() {
    this.sharedService.updateUserData('userProfile', this.userProfile);
    // this.data = this._myPartnerService.myPartnerList();
  }

  // to ender in edit mode
  edit() {
    this.editMode = true;
  }

  // save after edit
  save() {
    this.editMode = false;
    this.profileService.updateProfile(this.currentUser.username, this.editForm.value).subscribe(res => {
      // console.log('got update profile res:::::', res);
      if (res.success) {
        this.getProfile(this.currentUser);
        this.openSnackBar('Successfully Updated', 'OK');
      } else {
        this.openSnackBar('Error in Updation', 'Please Try Again');
      }
    });
    // console.log(this.userProfile.personalInfo);
    // console.log(this.profileListItem);
  }
}
