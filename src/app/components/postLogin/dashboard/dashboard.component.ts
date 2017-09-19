import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from './../../../services/chat.service';
import { ProfileService } from './../../../services/profile.service';
import { FormControl } from '@angular/forms';
import { SharedService } from './../../../services/shared.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ChatService]
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  messages = [];
  connection;
  msg;
  allProfiles = [];
  nameCtrl: FormControl;
  filteredNames: any;
  receiver = { name: '', email: '', profilePic: '' };
  profilePicLoc = './../../../../assets/images/profilePic/';
  onlineUsers = [];

  constructor(public chatService: ChatService, private profileService: ProfileService,
    private sharedService: SharedService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.profileService.getAllProfile().subscribe(res => {
      console.log(res);
      res.data.forEach(user => {
        if (user.username != this.currentUser.username) {
          if (!user.profilePic) {
            if (user.personalInfo.gender === 'm') {
              user.profilePic = this.profilePicLoc + 'male.png';
            } else if (user.personalInfo.gender === 'f') {
              user.profilePic = this.profilePicLoc + 'female.png';
            }
          }
          const Obj = { name: user.personalInfo.name, email: user.personalInfo.email, profilePic: user.profilePic, status: false };
          this.allProfiles.push(Obj);
        }
      });
      console.log(this.allProfiles);
    });

    this.nameCtrl = new FormControl();
    this.filteredNames = this.nameCtrl.valueChanges.map(name => this.filterNames(name));

    this.sharedService.sharedUserData$.subscribe(data => {
      // console.log('data from shared service: ', data.get('userProfile'));
      this.onlineUsers = data.get('onlineUsers');
      console.log('ONLINE USERS', this.onlineUsers);
      // this.allProfiles.forEach(user => {
      //   if (this.onlineUsers.includes(user.email)) {
      //     user.status = true;
      //   }else{
      //     user.status = false;
      //   }
      // });
    });
  }

  ngOnInit() {
    this.chatService.getMessages().subscribe(message => {
      console.log('data--->>>>', message);

      this.messages.push(message);
    });
    console.log('incoming--->>>', this.messages);
  }

  // filter names for autocomplete
  filterNames(val: string) {
    return val ? this.allProfiles.filter(s => s.name.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.allProfiles;
  }

  // start chat after Selection of user
  startChat(user) {
    if (!user) {
      console.log(this.nameCtrl.value);
      this.allProfiles.forEach(element => {
        if (this.nameCtrl.value === element.name) {
          this.receiver = { name: element.name, email: element.email, profilePic: element.profilePic };
        }
      });
    } else {
      this.receiver = { name: user.name, email: user.email, profilePic: user.profilePic };
    }
    this.messages = [];
  }

  // to send message
  sendMsg() {
    const msgObj = {
      sender: this.currentUser.username,
      receiver: this.receiver.email,
      msg: this.msg,
      time: Date.now()
    };
    this.msg = '';
    this.chatService.sendMessage(msgObj);
  }

}
