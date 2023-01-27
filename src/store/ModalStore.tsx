
export interface ModalData{
  _IsModalOpen: boolean;
  openModal: ()=>void;
  closeModal: ()=> void;
}

const ModalStore = (): ModalData=>{
  return {
    _IsModalOpen: false,
    openModal: function(){
      console.log("열어")
      this._IsModalOpen = true;
    },
    closeModal: function(){
      this._IsModalOpen = false;
    }
  }
}

export default ModalStore;