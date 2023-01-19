import React from 'react'
import CardDetail from '../../components/card/CardDetail';
import Wave from '../../components/wave/Wave';
import UserProfile from '../../components/UserProfile';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

// import useStore from '../../store/useStore';
// import { observer } from 'mobx-react';

const Profile = () => {
  // const {value} = useStore();
  // let userData = value.authStore.user[0];
  return (
    <div>
      <UserProfile/>
      <Box>
        <Wave></Wave>
      </Box>
      <CardDetail/>
      <Link to='/card/list'><button>더보기</button></Link>
    </div>
  )
}

// export default observer(Profile);
export default Profile;