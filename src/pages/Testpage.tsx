import { useRootStore } from '@provider/rootContext';
import { HoverDataForm } from '@store/UserStore';
import { styled } from '@mui/system';
import instance from '@service/axiosInterceptor'
import React, { useEffect, useState } from 'react'
// import { Box, Popover, Drawer, List, ListItem, ListItemButton, ListItemIcon  } from '@mui/material';

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

const Testpage = () => {

  //* 서랍 on/off 관련 state
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  //* 서랍 내용물

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="파도 목록" />
          </ListItemButton>    
        </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="헤이" />
            </ListItemButton>
          </ListItem>

      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <button onClick={()=>{
        Swal.fire({
          title: "잘가요! 다음에 또 만나요!",
          // text: "다음에 또 만나요! 안녕!",
          imageUrl: "https://res.cloudinary.com/nsurfer/image/upload/v1711561309/byecat_ff44et.png",
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: "Custom image"
        });
      }}>gg</button>
    </div>
  );
}

export default Testpage