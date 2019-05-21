import _ from 'lodash'
function create_div_element() {
  const div_element = document.createElement('div')
  div_element.innerHTML = _.join(['kobe', 'cpul'], "  ")
  return div_element
}
const div_ele = create_div_element()
document.body.appendChild(div_ele)