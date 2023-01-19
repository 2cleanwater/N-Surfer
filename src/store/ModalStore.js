import { makeObservable, observable, action, makeAutoObservable } from "mobx"

// export default class ModalStore {
//   rootStore;
//   _IsModalOpen = false;

//   constructor() {
//     makeObservable(this, {
//       _IsModalOpen: observable,
//       openModal: action,
//       closeModal: action
//     });
//     // makeAutoObservable(this);
//   }

//   openModal(){
//     this._IsModalOpen = true;
//   }
//   closeModal(){
//     this._IsModalOpen = false;
//   }
// }

// import React from 'react'

// const ModalStore = () => {
//   console.log("모달스토어 잘 읽힙니다.")
//   return {
//     _IsModalOpen : false,
//     oepnModal() {
//       this._IsModalOpen = true;
//       window.alert("헤이")
//     },
//     closeModal() {
//       this._IsModalOpen = false;
//     }
//   }
// }

// export default ModalStore

const ModalStore = {
  _IsModalOpen: false,
  oepnModal: () => {
    // this._IsModalOpen = true;
    console.log("테스트")
    return
  },
  closeModal: () => {
    this._IsModalOpen = false;
  }
}

export default ModalStore;