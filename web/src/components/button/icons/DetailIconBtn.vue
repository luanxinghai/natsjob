<template>
  <el-button circle size="small" v-bind="$attrs">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <!-- 文档外框 -->
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <!-- 折角 -->
        <polyline points="14 2 14 8 20 8" />
        <!-- 内容横线 -->
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <!-- 小点装饰 -->
        <polyline points="10 9 9 9 8 9" />
      </g>
    </svg>
  </el-button>
</template>

<script setup></script>

<style lang="scss" scoped></style>
