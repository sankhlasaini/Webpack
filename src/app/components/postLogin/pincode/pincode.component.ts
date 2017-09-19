import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GovtDataService } from './../../../services/govt-data.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.css'],
  providers: [GovtDataService],
  animations: [
    trigger('animateTop', [
      transition('void => *', [
        animate(500, keyframes([
          style({ opacity: 0, transform: 'translateY(-50px)', offset: 0 }),
          style({ opacity: .75, transform: 'translateY(10px)', offset: .75 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
        ]))
      ])
    ])
  ]
})
export class PincodeComponent implements OnInit {
  searchForm: FormGroup;
  searchInput = 'searchInputBlur';
  pincodeRes;
  public filterQuery = '';
  public rowsOnPage = 5;
  public sortBy = 'officename';
  public sortOrder = 'asc';

  constructor( @Inject(FormBuilder) fb: FormBuilder, private govtDataService: GovtDataService) {
    this.searchForm = fb.group({
      pincode: ['', [Validators.pattern(/^[1-9][0-9]{5}$/)]],
    });
  }

  ngOnInit() { }
  public toInt(num: string) {
    return +num;
  }

  search() {
    if (this.searchForm.value.pincode.length === 6) {
      console.log(this.searchForm.value);
      this.govtDataService.getLocByPin(this.searchForm.value.pincode).subscribe(res => {
        console.log(res);
        this.pincodeRes = res;
      });
    } else {
      this.pincodeRes = null;
    }
  }

}



