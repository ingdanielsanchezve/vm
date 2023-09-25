<template>
  <div class="flex items-center">
    <div class="relative pt-1 w-full">
      <div class="flex mb-2 items-center justify-between">
        <div class="text-right">
          <span class="text-xs font-semibold inline-block text-blue-600">
            {{ progress }}%
          </span>
        </div>
      </div>
      <div class="flex mb-2 items-center justify-between">
        <div class="w-full bg-gray-200 rounded-full">
          <div class="relative pt-1">
            <div class="flex mb-2 items-center justify-between">
              <div class="flex flex-col text-center justify-center w-full">
                <div class="flex-shrink-0">
                  <div class="w-full rounded-full bg-blue-200">
                    <div :style="{ width: progress + '%' }" class="rounded-full text-center py-1 text-xs font-semibold text-white bg-blue-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    progress: {
      required: true,
      default: 0
    }
  }
}

</script>