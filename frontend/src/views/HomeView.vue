<template>
    <div>
        <p>Hello, world!</p>
        <p>{{ data.route == undefined ? "Undefined" : "Defined"   }}</p>

    </div>
</template>

<script>
</script>

<script setup>
import { useMainStore } from '@/stores/store';
import axios from 'axios'
import { onMounted, ref, Suspense } from 'vue';

const store = useMainStore();

const data = ref({});
const generateURL = '/api/run/generate'

const fetchData = async () => {
    data.value = (await axios.get(generateURL)).data;
}

onMounted(fetchData);
</script>
<style lang="scss" scoped>

</style>