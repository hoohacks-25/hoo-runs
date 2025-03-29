<template>
    <div>
        <h1></h1>
        <RouteInfo ref="routeInfo"/>
        <Map class="mb-2" />
        <div class="grid grid-cols-2 gap-1 content-center">
            <button  class="btn hover:outline-none"  @click="generateRoute">Find Route</button>
            <Transition>
                <LoadingDots v-if="loadingRoute" />
            </Transition>
        </div>

    </div>
</template>

<script>
</script>

<script setup>
import { useMainStore } from '@/stores/store';
import axios from 'axios'

import RouteInfo  from '../components/RouteInfo.vue'
import Map from '@/components/Map.vue'
import LoadingDots from '@/components/LoadingDots.vue'

import { ref } from 'vue';
import LoadingDotsVue from '../components/LoadingDots.vue';

const show = ref(false);
const store = useMainStore();
const routeInfo = ref(null);
const loadingRoute = ref(true);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const generateRoute = async () => {
    loadingRoute.value = true;
    await sleep(5000);
    const data = (await routeInfo.value.generateRoute()).data;
    loadingRoute.value = false;
    console.log(data);
}
</script>
<style scoped>
.btn {
    background: #3e91fe;
    border:none;
    color: antiquewhite;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
