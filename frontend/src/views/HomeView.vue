<template>
    <div>
        <h1></h1>
        <RouteInfo ref="routeInfo"/>
        <button  class="btn" @click="$refs.routeInfo.generateRoute">Find Route</button>

    </div>
</template>

<script>
</script>

<script setup>
import { useMainStore } from '@/stores/store';
import axios from 'axios'

import RouteInfo  from '../components/RouteInfo.vue'

const store = useMainStore();

</script>
<style scoped>
.btn {
    background: lightskyblue;
}
</style>