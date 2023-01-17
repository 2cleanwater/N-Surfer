import React from 'react'
import CardDetail from '../../components/card/CardDetail';
import Wave from '../../components/wave/Wave';
import { Link } from 'react-router-dom';

import useStore from '../../store/useStore';
import { observer } from 'mobx-react';

const Profile = () => {
  const {value} = useStore();
  let userData = value.authStore.user[0];
  console.log(userData['userName']);
  return (
    <div>
      <div className='ProfilePic'>
        <div>
          이미지
        </div>
        <div>
          <button>이미지 수정하기</button>
          <button>탈퇴하기</button>
        </div>
        <div>
          HI~ this is {userData['userName']}
        </div>
      </div>

      <div className='wave'>
        <Wave></Wave>
      </div>
      <div>
        <CardDetail></CardDetail>
      </div>
      <Link to='/card/list'><button>더보기</button></Link>
    </div>
  )
}

export default observer(Profile);