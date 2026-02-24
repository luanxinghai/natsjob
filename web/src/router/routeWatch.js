import { useRouter, useRoute } from "vue-router"

export const useActiveRoutePath = () => {
  const activeRoutePath = ref("")
  const activeRouteParentPath = ref("")
  const route = useRoute()

  watch(route, (to, oldValue) => {
    activeRoutePath.value = to.path
  })

  onMounted(() => {
    activeRoutePath.value = route.path
  })

  return { activeRoutePath, activeRouteParentPath }
}

const isHasPath = (child, path) => {
  let ishh = child.find((item) => item.path == path)
  if (ishh) {
    return true
  }

  if (item?.children && item?.children.length > 0) {
    return isHasPath(item.children, path)
  }
  return false
}
