import { useRootStore } from '@provider/rootContext';
import { HoverDataForm } from '@store/UserStore';
import { styled } from '@mui/system';
import instance from '@service/axiosInterceptor'
import React, { useEffect, useState } from 'react'
// import { Box, Popover, Drawer, List, ListItem, ListItemButton, ListItemIcon  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import Swal from 'sweetalert2'
import { IconButton } from '@mui/material';

const Testpage = () => {

  const value = useRootStore()!;
  const [testData, setTestData]= useState<string>("지금은 비엇따");

  
    useEffect(() => {
      //로그인했을 때 동작
      if(value.profileStore.userData.useId){
        const eventSource = new EventSource('/alarm/subscription');
  
        eventSource.onmessage = (event) => {
          console.log(event.data)
          setTestData(event.data)
        };
        return () => {
          eventSource.close();
        };
      }
    }, []);

  return (
    <div>
      로그인이 됐을 때만 구독이 됨
      <Box sx={{fontSize:"2em"}}>{testData}</Box>
    </div>
  );
}

export default Testpage