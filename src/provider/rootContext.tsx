import { observable, toJS } from 'mobx';
import { createContext, ReactNode, useContext } from 'react'
import AuthStore, {AuthData} from '@store/AuthStore';
import ModalStore, {ModalData} from '@store/ModalStore';
import ProfileStore, {ProfileData} from '@store/ProfileStore';

const RootContext = createContext<{modalStore: ModalData,authStore: AuthData, profileStore: ProfileData}|undefined>(undefined);

interface MyChildren {
  children: ReactNode;
};

export const RootProvider = ({children}: MyChildren) => {
  const modalStore = observable<ModalData>(ModalStore());
  const authStore = observable<AuthData>(AuthStore());
  const profileStore = observable<ProfileData>(ProfileStore());
  return (
    <RootContext.Provider value={{modalStore, authStore, profileStore}}>{children}</RootContext.Provider>
  )
}

export const useRootStore = () => useContext(RootContext)