import _ from 'lodash'
import './style/base.scss'
import './style/reset.css'
function create_div_element() {
  const div_element = document.createElement('div')
  div_element.innerHTML = _.join(['kobe', 'cpul'], "  ")
  return div_element
}
const div_ele = create_div_element()
const h1_element = document.createElement('h1')
h1_element.innerHTML = '哈哈哈'
document.body.appendChild(div_ele)
document.body.appendChild(h1_element)