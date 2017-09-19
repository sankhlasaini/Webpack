import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class GovtDataService {

  // url to get pincode info

  public mygovKey = 'bb69790db92cb17b4b5c8b3bf4f9fc02';
  // pincode resource
  public resourceId = '6176ee09-3d56-4a3b-8115-21841576b2f6';
  // public resourceId = '0a076478-3fd3-4e2c-b2d2-581876f56d77';

  // hospital-directory-national-health-portal
  public resourceIdHospital = '37670b6f-c236-49a7-8cd7-cc2dc610e32d';


  private govtUrl = 'https://data.gov.in/api/datastore/resource.json?resource_id=';
  private apiLoc = '&api-key=' + this.mygovKey + '&filters[pincode]=';

  constructor(private _http: Http) { }

  // get json data for pincode details
  getLocByPin(pincode: string) {
    return this._http.get(this.govtUrl + this.resourceId + this.apiLoc + pincode)
      .map((response: Response) => response.json());
  };

  // get json data for pincode details
  getHosByPin(pincode: string) {
    return this._http.get(this.govtUrl + this.resourceIdHospital + this.apiLoc + pincode)
      .map((response: Response) => response.json());
  };
}
