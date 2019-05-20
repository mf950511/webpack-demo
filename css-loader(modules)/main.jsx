import React from 'react'
import ReactDOM from 'react-dom'
const style = require('./app.css')
ReactDOM.render(
  <div>
    <h1 className={style.h1}>Hello World</h1>
    <h2 className="h2">HelloWorld</h2>
  </div>,
  document.querySelector('#example')
)