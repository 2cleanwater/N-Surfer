import React from 'react'
import CardDetail from '../../components/card/CardDetail';
import Wave from '../../components/wave/Wave';
import UserProfile from '../../components/UserProfile';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';


const Profile = () => {
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

export default Profile;