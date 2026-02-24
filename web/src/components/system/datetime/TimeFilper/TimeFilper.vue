<template>
  <span>
    <Timer
      :seconds="time.seconds"
      :minutes="time.minutes"
      :hours="time.hours"
    />
  </span>
</template>

<script setup>
import { useTime } from 'vue-timer-hook'
import Timer from './timer.vue'

const time = useTime('24-hour')
</script>

<style lang="scss" scoped></style>
