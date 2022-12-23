import { makeObservable, observable, action, makeAutoObservable } from "mobx"

export default class ModalStore {
  rootStore;
  _IsModalOpen = false;

  constructor() {
    makeObservable(this, {
      _IsModalOpen: observable,
      openModal: action,
      closeModal: action
    });
    // makeAutoObservable(this);
  }

  openModal(){
    this._IsModalOpen = true;
  }
  closeModal(){
    this._IsModalOpen = false;
  }
}
