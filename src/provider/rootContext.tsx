import { observable, toJS } from 'mobx';
import { createContext, ReactNode, useContext } from 'react'
import AuthStore, {AuthData} from '../store/AuthStore';
import ModalStore, {ModalData} from '../store/ModalStore';

const RootContext = createContext<{modalStore: ModalData,authStore: AuthData}|undefined>(undefined);

interface MyChildren {
  children: ReactNode;
};

export const RootProvider = ({children}: MyChildren) => {
  const modalStore = observable<ModalData>(ModalStore());
  const authStore = observable<AuthData>(AuthStore());
  return (
    <RootContext.Provider value={{modalStore, authStore}}>{children}</RootContext.Provider>
  )
}

export const useRootStore = () => useContext(RootContext)