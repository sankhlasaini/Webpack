import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-govt-info',
  templateUrl: './govt-info.component.html',
  styleUrls: ['./govt-info.component.css']
})
export class GovtInfoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  send(link) {
    switch (link) {
      case 'locByPin':
        this.router.navigate(['/govt/pincode']);
        break;
      case 'hosByPin':
        this.router.navigate(['/govt/hospital']);
        break;
    }
  }
}
