<template>
  <div id="app" class="bg-gray-100 min-h-screen flex items-center justify-center">
    <TasksManager />
  </div>
</template>

<script>
import TasksManager from './components/TasksManager.vue'

export default {
  name: 'App',
  components: {
    TasksManager
  }
}
</script>
