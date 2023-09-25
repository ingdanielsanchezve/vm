<template>
  <p v-if="isBusy" class="mt-2"
    :class="{
      'text-orange-400': isStarting,
      'text-blue-500': isRunning,
      'text-green-500': isCompleted,
      'text-red-500': isCanceled
    }" >
    Task: <strong>{{ taskName }}</strong> is {{ taskStatus }} <span v-if="isInProgress">on <strong>{{ vmType }}</strong></span>
    <font-awesome-icon :icon="['fas', icon]" :spin="isInProgress" class="ml-1" />
  </p>
</template>

<script>
import { TASK_STATUS, TASK_ICONS } from '@/common/app.const'

export default {
  props: {
    taskName: {
      type: String,
      required: true,
      default: ''
    },
    taskStatus: {
      type: String,
      required: true,
      default: ''
    },
    vmType: {
      type: String,
      required: true,
      default: ''
    }
  },
  computed: {
    isBusy () {
      return Object.values(TASK_STATUS).includes(this.taskStatus)
    },
    isInProgress () {
      return [TASK_STATUS.RUNNING, TASK_STATUS.STARTING].includes(this.taskStatus)
    },
    isStarting () {
      return this.taskStatus === TASK_STATUS.STARTING
    },
    isRunning () {
      return this.taskStatus === TASK_STATUS.RUNNING
    },
    isCompleted () {
      return this.taskStatus === TASK_STATUS.COMPLETED
    },
    isCanceled () {
      return this.taskStatus === TASK_STATUS.CANCELED
    },
    icon () {
      return TASK_ICONS[this.taskStatus.toUpperCase()]
    }
  }
}

</script>