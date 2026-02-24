<template>
  <span
    class="si-state"
    :class="[{ 'si-status-processing': pulse }, 'si-state-bg--' + type]"
  ></span>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'primary' },
    pulse: { type: Boolean, default: false },
  },
}
</script>

<style scoped>
.si-state {
  display: inline-block;
  background: #000;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  vertical-align: middle;
}
.si-status-processing {
  position: relative;
}
.si-status-processing:after {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: inherit;
  content: '';
  animation: warn 1.2s ease-in-out infinite;
}

.si-state-bg--primary {
  background: var(--el-color-primary);
}
.si-state-bg--success {
  background: var(--el-color-success);
}
.si-state-bg--warning {
  background: var(--el-color-warning);
}
.si-state-bg--danger {
  background: var(--el-color-danger);
}
.si-state-bg--info {
  background: var(--el-color-info);
}

@keyframes warn {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  30% {
    opacity: 0.7;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}
</style>
