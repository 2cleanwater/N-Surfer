import React from 'react'

import { observer } from 'mobx-react-lite';
import useStore from '../../store/useStore';

const User = () => {
  const {value} = useStore();
  return (
    <div>User</div>
  )
}

export default observer(User);