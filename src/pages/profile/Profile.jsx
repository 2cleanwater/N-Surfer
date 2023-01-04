import React from 'react'
import CardDetail from '../../components/card/CardDetail';
import Wave from '../../components/wave/Wave';
import useStore from '../../store/useStore'
import { Link } from 'react-router-dom';

const Profile = () => {
  const {value} = useStore();
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

export default Profile