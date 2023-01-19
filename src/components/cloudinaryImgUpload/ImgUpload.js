import {useEffect, useRef} from 'react'

const ImgUpload = () => {
  const cloudinaryRef = useRef();
  useEffect(()=>{
    cloudinaryRef.current = window.cloudinary;
    

  },[]);

  return (
    <div>ImgUpload</div>
  )
}

export default ImgUpload