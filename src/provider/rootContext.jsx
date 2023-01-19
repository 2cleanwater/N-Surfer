import { observable } from 'mobx';
import { useLocalObservable } from 'mobx-react';
import { createContext, useContext } from 'react'
import AuthStore from '../store/AuthStore';
import ModalStore from '../store/ModalStore';

const RootContext = createContext(null);

export const RootProvider = ({children}) => {
  const modalStore = observable(ModalStore);
  const authStore = observable(AuthStore);
  modalStore.oepnModal();
  return (
    <RootContext.Provider value={{modalStore, authStore}}>{children}</RootContext.Provider>
  )
}

export const useRootStore = () => useContext(RootContext)