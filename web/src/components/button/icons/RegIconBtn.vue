<template>
  <el-button circle size="small" v-bind="$attrs">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <!-- 简化的主机/服务方块 -->
        <rect x="4" y="4" width="16" height="12" rx="2" />
        <!-- 底部连接线，表示注册/连接 -->
        <path d="M8 16v4M16 16v4M8 20h8" />
      </g>
    </svg>
  </el-button>
</template>

<script setup></script>

<style lang="scss" scoped></style>
