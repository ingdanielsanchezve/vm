<template>
 <div v-if="tasksHistory.length" class="table-auto mt-2">
    <h2 class="text-lg font-semibold mb-2">Tasks History</h2>
    <div class="max-h-96 overflow-y-scroll">
      <table class="w-full text-left border-collapse">
        <thead class="border-b sticky top-0">
          <tr>
            <th class="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-1">
              Task Name
              <font-awesome-icon :icon="['fas', 'arrow-circle-down']" class="float-right my-1 mr-2 ml-1 hover:cursor-pointer" @click="sortByProperty('name', 'desc')" />
              <font-awesome-icon :icon="['fas', 'arrow-circle-up']" class="float-right my-1 ml-2 hover:cursor-pointer" @click="sortByProperty('name', 'asc')" />
            </th>
            <th class="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-1">
              Status
              <font-awesome-icon :icon="['fas', 'arrow-circle-down']" class="float-right my-1 mr-2 ml-1 hover:cursor-pointer" @click="sortByProperty('status', 'desc')" />
              <font-awesome-icon :icon="['fas', 'arrow-circle-up']" class="float-right my-1 ml-2 hover:cursor-pointer" @click="sortByProperty('status', 'asc')" />
            </th>
            <th class="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-1">
              VM Type
              <font-awesome-icon :icon="['fas', 'arrow-circle-down']" class="float-right my-1 mr-2 ml-1 hover:cursor-pointer" @click="sortByProperty('vmType', 'desc')" />
              <font-awesome-icon :icon="['fas', 'arrow-circle-up']" class="float-right my-1 ml-2 hover:cursor-pointer" @click="sortByProperty('vmType', 'asc')" />
            </th>
            <th class="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-1">
              Execution Time (ms)
              <font-awesome-icon :icon="['fas', 'arrow-circle-down']" class="float-right my-1 mr-2 ml-1 hover:cursor-pointer" @click="sortByProperty('executionTime', 'desc')" />
              <font-awesome-icon :icon="['fas', 'arrow-circle-up']" class="float-right my-1 ml-2 hover:cursor-pointer" @click="sortByProperty('executionTime', 'asc')" />
            </th>
            <th class="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-1">
              Date
              <font-awesome-icon :icon="['fas', 'arrow-circle-down']" class="float-right my-1 mr-2 ml-1 hover:cursor-pointer" @click="sortByProperty('executionDate', 'desc')" />
              <font-awesome-icon :icon="['fas', 'arrow-circle-up']" class="float-right my-1 ml-2 hover:cursor-pointer" @click="sortByProperty('executionDate', 'asc')" />
            </th>
          </tr>
        </thead>
        <tbody class="max-h-96 overflow-y-auto">
          <tr v-for="(task, index) in tasksHistory" :key="index" class="hover:bg-slate-100 hover:cursor-pointer">
            <td class="py-2 pr-2 font-mono font-medium text-xs leading-6 whitespace-nowrap">{{ task.name }}</td>
            <td class="py-2 pr-2 font-mono font-medium text-xs leading-6 whitespace-nowrap">
              <span
                v-if="task.status === TASK_STATUS.COMPLETED"
                class="bg-green-500 text-white px-2 py-1 rounded"
              >
                <font-awesome-icon :icon="['fas', 'check-circle']" /> Completed
              </span>
              <span
                v-else-if="task.status === TASK_STATUS.CANCELED"
                class="bg-red-500 text-white px-2 py-1 rounded"
              >
                <font-awesome-icon :icon="['fas', 'circle-exclamation']" /> Canceled
              </span>
              <span v-else class="bg-blue-500 text-white px-2 py-1 rounded">{{ task.status }}</span>
            </td>
            <td class="py-2 pr-2 font-mono font-medium text-xs leading-6 whitespace-nowrap">{{ task.vmType }}</td>
            <td class="py-2 pr-2 font-mono font-medium text-xs leading-6 whitespace-nowrap">{{ task.executionTime }} ms</td>
            <td class="py-2 pr-2 font-mono font-medium text-xs leading-6 whitespace-nowrap">{{ task.executionDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { TASK_STATUS } from '@/common/app.const'

export default {
  props: {
    tasksHistory: {
      type: Array,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      TASK_STATUS
    }
  },
  methods: {
    sortByProperty(property, order) {
      this.$emit('sortByProperty', { property, order })
    }
  }
}
</script>