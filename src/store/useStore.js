import { MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'

function useStore() {
  return useContext(MobXProviderContext);
}

export default useStore;