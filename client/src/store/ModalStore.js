import { makeObservable, observable, action, makeAutoObservable } from "mobx"

export default class ModalStore {
  rootStore;
  _IsModalOpen = 6;

  constructor() {
    makeObservable(this, {
      _IsModalOpen: observable,
      openModal: action,
      closeModal: action
    });
    // makeAutoObservable(this);
  }

  openModal(){
    console.log("모달이 열립니다.")
    this._IsModalOpen = true;
  }
  closeModal(){
    console.log("모달이 닫힙니다.")
    this._IsModalOpen = false;
  }
}
