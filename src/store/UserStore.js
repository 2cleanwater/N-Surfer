import { makeObservable, observable, action, makeAutoObservable } from "mobx"

export default class UserStore {

  rootStore;
  user;
  //user = [userId, userImgs, userType, userBirth, userName, userWaves, userKakaoId, userGoogleId]
  isLogin = false;

  constructor() {
    makeObservable(this, {
      user: observable,
      isLogin: observable,
      openModal: action,
      closeModal: action
    });
    // makeAutoObservable(this);
  }

  setIsLogin(){
    this.isLogin = !isLogin;
  }
  closeModal(){
    this._IsModalOpen = false;
  }
}
