import { makeObservable, observable, action, makeAutoObservable } from "mobx"

export default class TokenStore {
  rootStore;
  accessToken = '';
  refreshToken = '';
  isRefreshing = false;

  constructor() {
    makeObservable(this, {
      accessToken: observable,
      refreshToken: observable,
      isRefreshing: observable,
      setTokens: action
    });
    // makeAutoObservable(this);
  }

  setToken(accessToken, refreshToken){
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
