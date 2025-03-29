<template>
  <div class="w-full max-w-lg">
    <form class="w-full max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
      for="grid-start-pos">
        Start Location
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border" 
      id="grid-start-pos" 
      type="text" 
      placeholder="Where do you want to start?">
    </div>
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
      for="grid-end-pos">
        End location
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border" 
      id="grid-start-pos" 
      type="text" 
      placeholder="Where do you want to go?">
    </div>
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
      for="grid-distance">
        Distance 
      </label>
      <input class="appearance-none block w-25 m-auto bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border" 
      id="grid-distance" 
      type="number" 
      max="500"
      placeholder="Miles">
    </div>

  </div>
</form>
  </div>
</template>

<script setup>
</script>
<style lang="scss" scoped>

</style>