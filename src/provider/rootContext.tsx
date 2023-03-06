import { observable, toJS } from 'mobx';
import { createContext, ReactNode, useContext } from 'react'
import AuthStore, { AuthData } from '@store/AuthStore';
import ModalStore, { ModalData } from '@store/ModalStore';
import ProfileStore, { ProfileData } from '@store/ProfileStore';
import WaveStore, { WaveData } from '@/store/WaveStore';

const RootContext = createContext<{modalStore: ModalData,authStore: AuthData, profileStore: ProfileData, waveStore: WaveData}|undefined>(undefined);

interface MyChildren {
  children: ReactNode;
};

export const RootProvider = ({children}: MyChildren) => {
  const modalStore= observable<ModalData>(ModalStore());
  const authStore= observable<AuthData>(AuthStore());
  const profileStore= observable<ProfileData>(ProfileStore());
  const waveStore= observable<WaveData>(WaveStore());
  return (
    <RootContext.Provider value={{modalStore, authStore, profileStore, waveStore}}>{children}</RootContext.Provider>
  )
}

export const useRootStore = () => useContext(RootContext)