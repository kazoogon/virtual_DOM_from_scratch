/**
 * create virtual DOM, it's actually just object
 * @param tagName
 * @param attrs
 * @param children
 * @returns {{children: *[], tagName, attrs: {}}}
 */
export default (tagName, {attrs = {}, children = []} = {}) => {
  return {
    tagName,
    attrs,
    children
  }
}