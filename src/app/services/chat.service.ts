import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { ProfileService } from './profile.service';
import { SharedService } from './shared.service';

@Injectable()
export class ChatService {
  private url = 'http://10.201.14.46:3000';
  private socket;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  onlineUsers = [];

  constructor(private profileService: ProfileService, private sharedService: SharedService) {
  }

  sendMessage(msgObj) {
    this.socket.emit('add-message', msgObj);
  }

  getMessages() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);

      this.socket.on('user-connected', (id) => {
        let obj = { username: this.currentUser.username, status: true, socketId: id };
        console.log(obj);
        this.socket.emit('add-user', obj);
        this.profileService.setStatus(obj).subscribe(res => {
          console.log('status ::', res);
        });
      });

      this.socket.on('active-users', (data) => {
        this.onlineUsers = data;
        console.log(data);
        this.sharedService.updateUserData('onlineUsers', data);
      });

      this.socket.on('message', (data) => {
        if (this.currentUser.username === data.to) { // for outgoing msg
          console.log('data--->>>>', data);
          const chat = { in: true, data: data };
          observer.next(chat);
        } else if (this.currentUser.username === data.from) { // for incoming msg
          console.log('data--->>>>', data);
          const chat = { in: false, data: data };
          observer.next(chat);
        }
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
