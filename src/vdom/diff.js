import render from "./render";

const zip = (xs, ys) => {
  const zipped = []
  // Math.max(): get longer number
  for (let i = 0; i<Math.max(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]])
  }
  return zipped
}

const diffAttrs = (oldAttrs, newAttrs) => {
  //it will be array of function [fn, fn, fn, fn .........], to change multiple attributes
  // each function just execute "setAttribute" or "removeAttribute", simple
  const patches = []

  // set new attributes
  // (Object.entries => change object to array like [['name', 'kazu'], ['prefecture', 'LA']])
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push($node => {
      $node.setAttribute(k, v)
      return $node
    })
  }

  // remove old attributes
  // if key doesnt exist in newAttrs, just remove attribute
  for (const k of Object.entries(oldAttrs)) {
    if (!(k in newAttrs)) {
      patches.push($node => {
        $node.removeAttribute(k)
        return $node
      })
    }
  }

  return $node => {
    for (const patch of patches) {
      patch($node)
    }
  }
}

const diffChildren = (oldVChildren, newVChildren) => {
  // compare new node and old node, but length of these nodes are different, so use longer one as the base
  // 新しいノードと古いノードを比べたいが、２つのchildrenの数が違うかもしれないので、長いほうを基準にする
  const childPatches = []
  for (const [oldVChild, newVChild]  of zip(oldVChildren, newVChildren)) {
    childPatches.push(diff(oldVChild, newVChild))
  }

  // if number of newVChildren is longer than oldVChildren, need to add new node
  // 新しいノードの方が長い場合、appendChild()でそのノードを追加する関数patch funcとして追加
  const additionalPatches = []// array of functions, which add new node which doesnt exist in old virtual element
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push($node=> {
      $node.appendChild(render(additionalVChild))
      return $node
    })
  }

  return $parent => {
    for (const [patch, child] of zip(childPatches, $parent.childNodes)) {
      patch(child)
    }
    for (const patch of additionalPatches) {
      patch($parent)
    }
    return $parent
  }
}

/**
 * 1, find different node between old virtual DOM and new virtual DOM
 * 2, return how to change this node of 1 as function
 */
const diff = (vOldNode, vNewNode) => {
  // if new node is empty, just remove it
  // 新しいノードが何もないなら、ただ消せばok
  if (vNewNode === undefined) {
    return $node => {
      $node.remove()
      return undefined
    }
  }

  // if text has changed, just replace text (in case of both of them are 'string')
  // 両方ともテキストで、内容が変更されたなら入れ替える
  if (typeof vOldNode === 'string' || vNewNode === 'string') {
    if (vOldNode !== vNewNode) {
      return $node => {
        const $newNode = render(vNewNode)
        $node.replaceWith($newNode)
        return $newNode
      }
    } else {
      return $node => undefined
    }
  }

  // img and div tag totally different, so we need to replace node
  // 全然違うタグの場合(img, a, divなど)、ノードをただ入れ替える
  if (vOldNode.tagName !== vNewNode.tagName) {
    return $node => {
      const $newNode = render(vNewNode)
      $node.replaceWith($newNode)
      return $newNode
    }
  }

  // check attributes or children has changed or not
  const patchAttrs = diffAttrs(vOldNode.attrs, vNewNode.attrs)
  const patchChildren = diffChildren(vOldNode.children, vNewNode.children)

  return $node => {
    patchAttrs($node)
    patchChildren($node)
    return $node
  }
}

export default diff