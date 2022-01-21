/**
 * create actual DOM
 * @param vNode
 * @returns {*}
 */
const renderElem = ({tagName, attrs, children}) => {
  const $el = document.createElement(tagName)

  // set attributes
  for (const [k, v] of Object.entries(attrs)) {
    $el.setAttribute(k, v)
  }

  // set children
  for (const child of children) {
    const $child = render(child)
    $el.appendChild($child)
  }
  return $el
}

const render = (vNode) => {
  // if node is text, there is no any attributes and children
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode)
  }

  return renderElem(vNode)
}

export default render