import { observer } from 'mobx-react'
import React from 'react'

// function CardList() {
//   return (
//     <div>CardList</div>
//   )
// }

// export default CardList

const CardList = observer(({rootStore}) =>{
  console.log(rootStore.modalStore.isModalOpen);
  return (
    <div>CardList</div>
  );
});
export default CardList;