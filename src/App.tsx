import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react';

import Navbar from '@components/utils/Navbar'
import Modal from '@components/utils/Modal';
import { useRootStore } from '@provider/rootContext';

import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab } from '@mui/material';

const App = ()=>{
  const value = useRootStore()!;
  const handleTopButtonClick = () => {
    if (!window.scrollY) return;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });  
  };
  return (
    <>
      <Navbar />
      <Outlet />
      {value.modalStore._IsModalOpen&&<Modal/>}
      <Fab sx={{position:"fixed", right:"3em", bottom:"3em"}} size="medium" color="inherit" aria-label="add"
      onClick={handleTopButtonClick}>
        <UpIcon  />
      </Fab>
    </>
  )
}

export default observer(App);