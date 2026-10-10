<template>
  <el-dialog class="d-dialog" center draggable align-center :fullscreen="fullScreen" :show-close="false" v-bind="attrs">
    <template #header="{ close, titleId }">
      <div class="d-header">
        <span class="d-title" :id="titleId">{{ title }}</span>
        <div class="d-actions">
          <!-- 全屏按钮：与文件预览弹窗（OpenFilePreviewDialog）保持一致的图标与交互效果 -->
          <el-tooltip :content="fullScreen ? '退出全屏' : '全屏显示'" placement="bottom" :show-after="200">
            <span class="d-action" :class="{ 'is-active': fullScreen }" @click="fullScreen = !fullScreen">
              <i :class="fullScreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'"></i>
            </span>
          </el-tooltip>
          <span class="d-action" @click="close" title="关闭">
            <i class="ri-close-line"></i>
          </span>
        </div>
      </div>
    </template>

    <div class="d-main" :style="mainStyle">
      <div class="d-scroll">
        <div class="d-form">
          <slot name="content"></slot>
        </div>
      </div>
      <div class="d-info">
        <slot name="info"></slot>
      </div>
      <div class="d-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { useAttrs, ref, watch } from 'vue'

const attrs = useAttrs()
const emit = defineEmits(['fullscreen-change'])

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  // 自定义固定高度：传入则替代默认 70vh（可传 '400px' / '500px' / 400 等）
  height: {
    type: [String, Number],
    default: '',
  },
  // 自适应高度：true 时不固定高度，弹窗随内容撑开（仅含少量内容的弹窗用，如编辑目录）
  fit: {
    type: Boolean,
    default: false,
  },
  // 固定高度：true 时内容区固定为 height 值（默认 70vh），不随内容伸缩；配合内部 height:100% 的子元素撑满
  fill: {
    type: Boolean,
    default: false,
  },
})

const fullScreen = ref(false)

// 归一化高度值：数字自动补 px，空值返回 ''
const normalizeHeight = (h) => {
  if (h === '' || h == null) return ''
  return typeof h === 'number' ? `${h}px` : h
}

// 内容区样式优先级：fit 完全自适应 > 全屏填满 > 自定义 height(作为最大高度) > 默认 70vh
// 自适应高度 + 最大高度上限：内容少时随内容撑开（不撑满最大高度），内容多时达到上限后内部滚动条
const buildMainStyle = () => {
  if (props.fit) return ''
  if (fullScreen.value) return 'height: calc(100vh - 100px);'
  const h = normalizeHeight(props.height)
  if (props.fill) return `height: ${h || '70vh'};`
  return `max-height: ${h || '70vh'};`
}

const mainStyle = ref(buildMainStyle())
watch([fullScreen, () => props.fit, () => props.height, () => props.fill], () => {
  mainStyle.value = buildMainStyle()
})

// 向外部广播全屏状态变化（供内容区按需撑满，如图标选择器）
watch(fullScreen, (v) => emit('fullscreen-change', v))

const setFullScreen = () => {
  fullScreen.value = true
}
defineExpose({
  setFullScreen,
})
</script>

<style lang="scss" scoped>
.d-dialog {

  // 关键：覆盖 Element Plus 默认 .el-dialog 根元素的 16px 四边内边距，
  // 否则弹窗顶部会多出 16px 空白（title 上方那片空白的真正来源）
  :deep(.el-dialog) {
    padding: 0 !important;
  }

  :deep(.el-dialog__header) {
    padding: 0 !important;
    margin-right: 0 !important;
  }

  :deep(.el-dialog__body) {
    padding: 0 !important;
    color: var(--el-text-color-regular);
  }
}

.d-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // height: 50px;
  // padding: 0 16px;
  // border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.d-title {
  flex: 1;
  min-width: 0;
  margin-right: 12px;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
}

.d-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 与文件预览弹窗（OpenFilePreviewDialog 的 .ofvp-tool-btn）保持一致的尺寸与悬停效果 */
.d-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  color: #606266;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #409eff;
    background: #ecf5ff;
  }

  &.is-active {
    color: #409eff;
    background: #ecf5ff;
  }
}

.d-main {
  display: grid;
  grid-template-rows: 1fr auto auto;
  overflow: hidden;

  .d-scroll {
    min-height: 0;
    overflow: auto;
    display: flex;
  }

  .d-form {
    flex: 1;
    min-height: 0;
    // 关键：flex item 默认 min-width:auto，内容（如 el-table 被 JS 测出的实际像素宽度）超出弹窗时
    // 会把内容区撑破容器，导致横向滚动轴出现在弹窗层（.d-scroll），整个表格被拖动、
    // fixed="right" 操作列被带到视口外。min-width:0 让内容区始终收敛在弹窗宽度内，
    // 宽度不够时由 el-table 内部横向滚动（操作列保持固定可见），弹窗层永不出横向滚动轴。
    min-width: 0;
    box-sizing: border-box;
    padding: 0px 24px;
  }

  .d-info {
    padding: 0 24px;
  }

  .d-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    // padding: 16px 24px;
    // margin-top: 8px;
    padding-top: 5px;
    // border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
}
</style>
