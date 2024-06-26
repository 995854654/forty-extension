import React from 'react'
import ReactDOM from 'react-dom';
import "./content.less"
import ContentMain from './ContentMain';
export default function Content() {
  return (
      <div className='CRX-content'>
          <ContentMain/>
    </div>
  )
}

// 创建id为CRX-container的div
const app = document.createElement('div')
app.id = "CRX-container"
// 将刚刚创建的div插入body最后
document.body.append(app)
// 将ReactDom插入刚刚创建的div
const crxContainer = ReactDOM.createRoot(document.getElementById('CRX-container'))
crxContainer.render(<Content />)
