import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class ProfileService {

  constructor(private _http: Http) { }

  // create new user account
  createAccount(profileData) {
    return this._http.post('/userCredential', profileData).map((res: Response) => {
      return res.json();
    });
  }
  // check email exist or not
  checkEmail(email) {
    return this._http.get('/userCredential', { search: { email: email } }).map((res: Response) => {
      return res.json();
    });
  }

  // get full profile of logged in user
  getProfile(currentUser) {
    return this._http.get('/profile', { search: currentUser }).map((res: Response) => {
      return res.json();
    });
  }

  // get full profile of logged in user
  getAllProfile() {
    return this._http.get('/profile/getAll').map((res: Response) => {
      return res.json();
    });
  }


  // Update full profile of logged in user
  updateProfile(username, profileData) {
    return this._http.patch('/profile', { username: username, profileData: profileData }).map((res: Response) => {
      return res.json();
    });
  }

  // get full profile of logged in user
  setStatus(obj) {
    return this._http.post('/profile/status', obj).map((res: Response) => {
      return res.json();
    });
  }

}
