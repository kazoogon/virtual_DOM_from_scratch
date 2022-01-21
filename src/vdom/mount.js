export default ($node, $target) => {
  // node which I created by render function replaces to 'app' id element
  $target.replaceWith($node)
  return $node
}