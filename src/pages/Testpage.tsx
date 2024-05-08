import { useRootStore } from '@provider/rootContext';
import { HoverDataForm } from '@store/UserStore';
import { styled } from '@mui/system';
import instance from '@service/axiosInterceptor'
import React, { useEffect, useState } from 'react'
// import { Box, Popover, Drawer, List, ListItem, ListItemButton, ListItemIcon  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

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
import { Badge, IconButton, Menu, MenuItem } from '@mui/material';
import Alarm from '@components/alarm/Alarm';

const Testpage = () => {

  const value = useRootStore()!;
  const [testData, setTestData]= useState<string>("지금은 비엇따");
  const [ancher, SetAncher] = useState<Boolean>(false);


  
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
      setAnchorEl(null);
    };
    const options = [
      'None',
      'Atria',
      'Callisto',
      'Dione',
      'Ganymede',
      'Hangouts Call',
      'Luna',
      'Oberon',
      'Phobos',
      'Pyxis',
      'Sedna',
      'Titania',
      'Triton',
      'Umbriel',
    ];
    
    const ITEM_HEIGHT = 48;

  return (
    <Box sx={{width:"100%"}}>
      로그인이 됐을 때만 구독이 됨
      <Box sx={{fontSize:"2em"}}>{testData}</Box>
      <button onClick={()=>{SetAncher(!ancher)}}>힣</button>
      {/* {ancher && <Alarm/>} */}
    </Box>
  );
}

export default Testpage