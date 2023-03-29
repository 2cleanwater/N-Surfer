export interface ModalStoreForm{
  _IsModalOpen: boolean;
  openModal: ()=>void;
  closeModal: ()=>void;
}

const ModalStore = (): ModalStoreForm=>{
  return {
    _IsModalOpen: false,
    openModal: function(){
      this._IsModalOpen = true;
    },
    closeModal: function(){
      this._IsModalOpen = false;
    }
  }
}

export default ModalStore;