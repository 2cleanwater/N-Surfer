import AuthStore, { AuthStoreForm } from '@store/AuthStore';
import ModalStore, { ModalStoreForm } from '@store/ModalStore';
import ProfileStore, { ProfileStoreForm } from '@store/ProfileStore';
import WaveStore, { WaveStoreForm } from '@store/WaveStore';
import OceanStore, { OceanStoreForm } from '@store/OceanStore';
import LoadingStore, { LoadingStoreForm } from '@store/LoadingStore';

import { observable } from 'mobx';
import { createContext, ReactNode, useContext } from 'react'

const RootContext = createContext<{
  modalStore: ModalStoreForm, 
  authStore: AuthStoreForm, 
  profileStore: ProfileStoreForm, 
  waveStore: WaveStoreForm, 
  oceanStore: OceanStoreForm,
  loadingStore: LoadingStoreForm
}|undefined>(undefined);

interface MyChildren {
  children: ReactNode;
};

export const RootProvider = ({children}: MyChildren) => {
  const modalStore= observable<ModalStoreForm>(ModalStore());
  const authStore= observable<AuthStoreForm>(AuthStore());
  const profileStore= observable<ProfileStoreForm>(ProfileStore());
  const waveStore= observable<WaveStoreForm>(WaveStore());
  const oceanStore= observable<OceanStoreForm>(OceanStore());
  const loadingStore= observable<LoadingStoreForm>(LoadingStore());
  return (
    <RootContext.Provider value={{modalStore, authStore, profileStore, waveStore, oceanStore, loadingStore}}>{children}</RootContext.Provider>
  )
}

export const useRootStore = () => useContext(RootContext)