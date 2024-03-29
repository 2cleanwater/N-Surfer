import AuthStore, { AuthStoreForm } from '@store/AuthStore';
import ModalStore, { ModalStoreForm } from '@store/ModalStore';
import ProfileStore, { ProfileStoreForm } from '@store/ProfileStore';
import WaveStore, { WaveStoreForm } from '@store/WaveStore';
import OceanStore, { OceanStoreForm } from '@store/OceanStore';
import CommentsStore ,{ CommentsStoreForm } from '@store/CommentsStore';
import UserStore, { UserStoreForm } from '@store/UserStore';

import { observable } from 'mobx';
import { createContext, ReactNode, useContext } from 'react'


const RootContext = createContext<{
  modalStore: ModalStoreForm, 
  authStore: AuthStoreForm, 
  profileStore: ProfileStoreForm, 
  waveStore: WaveStoreForm, 
  oceanStore: OceanStoreForm,
  commentStore: CommentsStoreForm,
  userStore: UserStoreForm
}|null>(null);

interface MyChildren {
  children: ReactNode;
};

export const RootProvider = ({children}: MyChildren) => {
  const modalStore= observable<ModalStoreForm>(ModalStore());
  const authStore= observable<AuthStoreForm>(AuthStore());
  const profileStore= observable<ProfileStoreForm>(ProfileStore());
  const waveStore= observable<WaveStoreForm>(WaveStore());
  const oceanStore= observable<OceanStoreForm>(OceanStore());
  const commentStore= observable<CommentsStoreForm>(CommentsStore());
  const userStore= observable<UserStoreForm>(UserStore());
  return (
    <RootContext.Provider value={{modalStore, authStore, profileStore, waveStore, oceanStore, commentStore, userStore}}>{children}</RootContext.Provider>
  )
}

export const useRootStore = () => useContext(RootContext)