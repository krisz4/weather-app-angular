import { Injectable } from '@angular/core';
import BasicMessage from './models/BasicMessage';
import User from './models/User';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  user: User;
  private userList: User[] = [];
  readonly userListKey = "WAPPUserList";
  readonly currentUserKey = "WAPPCurrentUser";
  constructor() { }

  getDefaultRoute(): string {
    this.getCurrentUser();
    if (this.user) {
      return '/weather';
    } else {
      return '/auth';
    }
  }
  getUserList() {
    let _userList = localStorage.getItem(this.userListKey);
    if (_userList) {
      this.userList = JSON.parse(_userList);
    }
  }

  getCurrentUser() {
    let _user = localStorage.getItem(this.currentUserKey);
    if (_user) {
      this.user = JSON.parse(_user);
    } else {
      console.error("Sikertelen felhasználó lekérdezés");
    }
  }

  login(name: string, password: string): BasicMessage {
    this.getUserList();
    for (let i = 0; i < this.userList.length; i++) {
      if (name === this.userList[i].name) {
        let _hash = Md5.hashStr(password);
        let check: boolean = _hash === this.userList[i].password ? true : false;
        if (check) {
          localStorage.setItem(this.currentUserKey, JSON.stringify({ ...this.userList[i], token: { expiration: "2022.02.02" } }));
          return {
            success: check
          };
        }else{
          return {
            success:false,
            errorMessage:"Hibás jelszó"
          }
        }
        
      }
    }
    return this.register(name, password, true);
  }

  logout(){
    localStorage.removeItem(this.currentUserKey);
    
  }

  register(name: string, password: string, skipCheck?: boolean): BasicMessage {
    let checkExists: BasicMessage = { success: false };
    try {
      if (!skipCheck) {
        checkExists = this.login(name, password);
      }

      if (!checkExists.success) {
        let hashedPassword = Md5.hashStr(password);
        let newUser: User = {
          name,
          password: hashedPassword
        };
        this.userList.push(newUser);
        localStorage.setItem(this.userListKey, JSON.stringify(this.userList));
        localStorage.setItem(this.currentUserKey, JSON.stringify({ ...newUser, token: { expiration: "2022.02.02" } }));
        return ({
          success: true
        })
      } else {
        return checkExists;
      }
    } catch (err) {
      return {
        success: false,
        errorMessage: err
      }
    }
  }
}
