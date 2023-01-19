import AuthStore from "./AuthStore";
import ModalStore from "./ModalStore";

// export default class RootStore{
//   modalStore;
//   authStore;

//   constructor() {
//     this.modalStore = new ModalStore(this);
//     this.authStore = new AuthStore(this);
//   }
// }

import React from 'react'
import { makeObservable } from "mobx";

const RootStore = () => {
  return makeObservable({
    modalStore : new ModalStore(),
    authStore : new AuthStore(),
  })
}

export default RootStore