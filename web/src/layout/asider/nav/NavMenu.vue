<template>
  <template v-for="navMenu in navMenus" v-bind:key="navMenu.name">
    <el-menu-item v-if="!hasChildren(navMenu)" :index="navMenu?.path" v-show="navMenu?.meta?.show != false">
      <a v-if="navMenu.meta && navMenu.meta.type == 'link'" :href="navMenu.path" target="_blank"
        @click.stop="() => { }"></a>

      <el-icon v-if="navMenu?.meta && navMenu?.meta?.ifont" :size="44">
        <i :class="navMenu.meta.ifont" class="ri-xxs ifont"></i>
      </el-icon>
      <el-icon v-else-if="navMenu.meta && navMenu.meta.icon" :size="44">
        <component :is="navMenu.meta.icon || 'menu'" />
      </el-icon>
      <template #title>
        <span class="menut-title">
          {{ navMenu?.meta?.title }}
        </span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="navMenu.path">
      <template #title>
        <el-icon v-if="navMenu.meta && navMenu.meta.ifont" :size="44">
          <i :class="navMenu.meta.ifont" class="ri-xxs ifont"></i>
        </el-icon>
        <el-icon v-else-if="navMenu.meta && navMenu.meta.icon">
          <component :is="navMenu.meta.icon || 'menu'" />
        </el-icon>

        <span class="menut-title">
          {{ navMenu.meta.title }}
        </span>
      </template>
      <NavMenu :navMenus="navMenu?.children"></NavMenu>
    </el-sub-menu>
  </template>
</template>

<script setup name="NavMenu">
const navMenus = defineModel('navMenus', { type: Array, deafult: [] })


const hasChildren = (item) => {
  return item?.children && !item?.children.every((item) => item.meta.show)
}
</script>
<style lang="scss" scoped>
.ifont {
  font-size: 17px;
}

.menut-title {}
</style>
