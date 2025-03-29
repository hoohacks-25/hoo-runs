<template>
    <div>
        <RouteInfo />
    </div>
</template>

<script>
</script>

<script setup>
import { useMainStore } from '@/stores/store';
import axios from 'axios'
import { onMounted, ref, Suspense } from 'vue';

import RouteInfo  from '../components/RouteInfo.vue'

const store = useMainStore();

</script>
<style lang="scss" scoped>

</style>