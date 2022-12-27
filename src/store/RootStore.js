import AuthStore from "./AuthStore";
import ModalStore from "./ModalStore";

export default class RootStore{
  modalStore;
  authStore;

  constructor() {
    this.modalStore = new ModalStore(this);
    this.authStore = new AuthStore(this);
  }
}