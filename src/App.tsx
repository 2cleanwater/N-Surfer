import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'
import { observer } from 'mobx-react';
import ModalLogin from './components/modalLogin/ModalLogin';
import { useRootStore } from './provider/rootContext';

const App = ()=>{

  const value = useRootStore()!;

  return (
    <>
      <Navbar />
      <Outlet />
      {value.modalStore._IsModalOpen&&<ModalLogin/>}
    </>
  )
}

export default observer(App);