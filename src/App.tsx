import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react';

import Navbar from '@components/Navbar'
import Modal from '@components/Modal';
import { useRootStore } from '@provider/rootContext';

import { Box } from '@mui/material';


const App = ()=>{
  const value = useRootStore()!;
  return (
    <>
      <Navbar />
      <Outlet />
      {value.modalStore._IsModalOpen&&<Modal/>}
    </>
  )
}

export default observer(App);