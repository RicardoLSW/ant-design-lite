import { cloneDeep } from 'lodash'
export default function routeConvert(routes) {
  if (!routes) return null
  routes = cloneDeep(routes)
  let queue = Array.isArray(routes) ? routes.concat() : [routes]
  while (queue.length) {
    const levelSize = queue.length
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()

      if (!node.children || !node.children.length) continue

      node.children.forEach(child => {
        if (child.path[0] !== '/' && !child.path.startsWith('http')) {
          child.path = node.path.replace(/(\w*)[/]*$/, `$1/${child.path}`)
        }
      })

      queue = queue.concat(node.children)
    }
  }
  return routes
}
