import ModalStore from "./ModalStore";

export default class RootStore{
  modalStore;

  constructor() {
    this.modalStore = new ModalStore(this);
  }
}