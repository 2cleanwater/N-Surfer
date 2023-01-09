import AuthStore from "./AuthStore";
import ModalStore from "./ModalStore";
import TokenStore from "./TokenStore";

export default class RootStore{
  modalStore;
  authStore;
  tokenStore;

  constructor() {
    this.modalStore = new ModalStore(this);
    this.authStore = new AuthStore(this);
    this.tokenStore= new TokenStore(this);
  }
}