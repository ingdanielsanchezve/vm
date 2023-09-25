<template>
  <div class="bg-white p-4 sm:p-8 rounded-lg shadow-md">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
      <div>
        <select
          id="vmType"
          v-model="vmType"
          :disabled="isBusy"
          class="w-full p-2 border rounded-md focus:outline-none"
          :class="{'bg-red-100 border-red-300 text-red-400': errors === ERRORS.VM_TYPE.error}"
          @change="validate('vmType')"
        >
          <option value="" disabled hidden>Select VM Type</option>
          <option v-for="(time, vm) in VM_TIMES" :value="vm" :key="vm">{{ vm }}</option>
        </select>
      </div>

      <div>
        <input
          placeholder="Task Name"
          type="text"
          id="taskName"
          v-model="taskName"
          :disabled="isBusy"
          maxlength="15"
          class="w-full p-2 border rounded-md focus:outline-none focus:bg-blue-50 focus:border-blue-200"
          :class="{'bg-red-100 border-red-300': errors === ERRORS.TASK_NAME.error}"
          @keyup.enter="startTask"
          @keydown="validate('taskName')"
        >
      </div>

      <div>
        <button @click="startTask" class="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 active:bg-blue-600">
          <font-awesome-icon :icon="['fas', 'play']" />
        </button>
        <button @click="cancelTask" v-if="isRunning" class="bg-red-500 text-white px-4 py-2 rounded-md active:bg-red-600">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>
    </div>

    <p v-if="hasErrors" class="mt-2 text-red-500">{{ message }}</p>

    <TaskOutput
      :task-name="taskName"
      :vm-type="vmType"
      :task-status="taskStatus"
    />
    <ProgressBar v-if="isRunning" :progress="progress" />

    <TasksHistory :tasks-history="tasksHistory" @sortByProperty="sortByProperty"/>
  </div>

</template>

<script>
import TasksHistory from './TasksHistory.vue'
import ProgressBar from './ProgressBar.vue'
import TaskOutput from './TaskOutput.vue'

import { VM_TIMES, TASK_STATUS, ERRORS } from '@/common/app.const'

const TASKS_STORAGE_ID = 'tasks'

export default {
  components: {
    TasksHistory,
    ProgressBar,
    TaskOutput
  },
  data (){
    return {
        VM_TIMES,
        vmType: '',
        taskId: '',
        taskName: '',
        taskStatus: '',
        message: '',
        tasksHistory: [],
        progress: 0,
        elapsedTime: 0,
        executionTime: 0,
        errors: '',
        ERRORS,
      }},
      computed: {
        isBusy () {
          return Object.values(TASK_STATUS).includes(this.taskStatus)
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
        hasErrors () {
          return this.errors.length
        }
      },
      mounted() {
        this.loadTasksFromLocalStorage()
      },
      methods: {
        // Load tasks from local storage.
        loadTasksFromLocalStorage () {
          const tasksData = JSON.parse(localStorage.getItem(TASKS_STORAGE_ID))
          if (tasksData) {
            this.tasksHistory = tasksData
          }
        },
        // Validate fields (vmType and taskName).
        // @param {Array} fields - Fields to validate.
        // @returns {boolean} - Returns true if validation is successful, otherwise false.
        validate (fields) {
          if (fields.includes('vmType') && this.vmType === '') {
            this.message = ERRORS.VM_TYPE.message
            this.errors = ERRORS.VM_TYPE.error
            this.taskStatus = ''
            return false
          }

          if (fields.includes('taskName')){
            if(this.taskName === '') {
              this.message = ERRORS.TASK_NAME.message
              this.errors = ERRORS.TASK_NAME.error
              this.taskStatus = ''
              return false
            }

            const isValidName = /^[a-zA-Z0-9\s-]*$/.test(this.taskName)
            if(!isValidName) {
              this.message = ERRORS.TASK_NAME_INVALID.message
              this.errors = ERRORS.TASK_NAME_INVALID.error
              this.taskStatus = ''
              return false
            }
          }
          this.message = ''
          this.errors = ''
          return true
        },
        // Start a new task execution.
        startTask() {
          const isValid = this.validate(['vmType', 'taskName'])
          if (!isValid) { return }

          this.taskStatus = TASK_STATUS.STARTING
          this.progress = 0
          setTimeout(() => {
            this.executeTask()
          }, 500) //Simulate task starting
        },
        // Simulate task execution and update progress.
        executeTask() {
          const { min, max } = VM_TIMES[this.vmType]
          this.executionTime = Math.floor(Math.random() * (max - min + 1)) + min
          this.taskStatus = TASK_STATUS.RUNNING

          const interval = 100

          const updateProgress = () => {
            if (this.isCanceled) { return }

            this.elapsedTime += interval
            this.progress = ((this.elapsedTime / this.executionTime) * 100).toFixed(2)
            if (this.elapsedTime < this.executionTime) {
              requestAnimationFrame(updateProgress)
            } else {
              this.taskStatus = TASK_STATUS.COMPLETED
              this.message = `Task: ${this.taskName} is `
              this.logTask()
              this.clearValues()
            }
          }

          updateProgress()
        },
        // Cancel the running task.
        cancelTask() {
          if (this.taskStatus === 'Running') {
            clearTimeout()
            this.taskStatus = TASK_STATUS.CANCELED
            this.message = `Task: ${this.taskName}`
            this.logTask()
            this.clearValues()
          }
        },
        // Log a task to the history.
        logTask () {
          const executionDate = new Date(Date.now()).toLocaleString()
          const executionTime = this.taskStatus === TASK_STATUS.COMPLETED ? this.executionTime : this.elapsedTime
          const taskData = { name: this.taskName, status: this.taskStatus, vmType: this.vmType, executionTime, executionDate }
          this.tasksHistory.push(taskData)
          localStorage.setItem(TASKS_STORAGE_ID, JSON.stringify(this.tasksHistory))
        },
        // Clear property values.
        clearValues () {
          this.vmType = ''
          this.progress = 0
          this.elapsedTime = 0
          this.executionTime = 0
          setTimeout(() => {
            this.taskName = ''
            this.message = ''
            this.taskStatus = ''
          }, 1000)
        },
        // Sort the task history by a specific property and in a specific order.
        // @param {Object} options - Sorting options (property: property, order: order).
        sortByProperty({property, order}) {
          const ORDERS = {
            'asc': 1,
            'desc': -1
          }

          this.tasksHistory.sort((a, b) => {
            const comparison = ORDERS[order] || 0

            if (a[property] < b[property]) {
              return -comparison
            } else if (a[property] > b[property]) {
              return comparison
            }

            return 0
          })
        }
      }
}
</script>
