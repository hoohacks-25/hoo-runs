<template>
    <div>
        <p>Hello, world!</p>
        <div>Count: {{  store.count  }}</div>
        <button @click="store.increment">Increment</button>
    </div>
</template>

<script>
</script>

<script setup>
import { useMainStore } from '@/stores/store';

const store = useMainStore();
</script>
<style lang="scss" scoped>

</style>