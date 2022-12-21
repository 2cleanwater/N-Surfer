















// import React from 'react'
// import { useState } from 'react';
// import { createContext, useContext } from 'react'

// export const ModalsStateContext = createContext([]);

// // modal을 열고 닫는 함수
// export const ModalsDispatchContext = createContext({
//     open: () => {},
//     close: () => {}
// });

// export const ModalsProvider = ({children}) => {
//   const [openedModals, setOpenedModals] = useState([]);
//   const open = (Component, props) => {
//       setOpenedModals((modals) => {
//           return [...modals, { Component, props }];
//       });
//   }
//   const close = (Component) => {
//       setOpenedModals((modals) => {
//         return modals.filter(modal => modal.Component !== Component);
//       });
//   }
  
//   const dispatch = {open, close};
//   return (
//       <ModalsDispatchContext.Provider value={dispatch}>
//           <ModalsStateContext.Provider value={openedModals}>
//               {children}
//           </ModalsStateContext.Provider>
//       </ModalsDispatchContext.Provider>
//   );
// }

// export const Modals = () => {
//   const openedModals = useContext(ModalsStateContext);
//   const { close } = useContext(ModalsDispatchContext);
  
//   return openedModals.map((modal, index) => {
//       const { Component, props } = modal;
//       const { onSubmit, ...restProps } = props;
      
//       const onClose = () => {
//           close(Component);
//       }
//       const handleSubmit = async () => {
//           if (typeof onSubmit === "function") {
//               await onSubmit();
//           }
//           onClose();
//       };
      
//       return (
//           <Component
//               key={index}
//               onClose={onClose}
//               handleSubmit = {handleSubmit}
//               {...restProps}
//           />
      
//       );
      
//   });
// }

// export function useModals() {
//   const { open, close } = useContext(ModalsDispatchContext);

//   const openModal = (Component, props) => {
//     open(Component, props);
//   };
//   const closeModal = (Component) => {
//     close(Component);
//   };
//   return { openModal, closeModal };
// }


