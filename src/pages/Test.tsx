import { notionToHtml } from '@service/notionToHtml'
import Loading from '@components/Loading'
import { htmlToNotion } from 'html-to-notion-blocks'


function Test() {
  const html = '<p>Hello world!</p>'
  // const notionBlocks= notionToHtml("제목","2034년 12월 16일","이정수",["강현욱","고무성"],["https://res.cloudinary.com/nsurfer/image/upload/v1680503595/N-Surfer_Icon_hngfrk.png","https://res.cloudinary.com/nsurfer/image/upload/v1680503594/naverIcon_xnyhsx.png"],"강현욱은죽었다.");

  
  // console.log(notionBlocks)
  return (
    <div>
      <button>헤이!</button>
    </div>
  )
}

export default Test