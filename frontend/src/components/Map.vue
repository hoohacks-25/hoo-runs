<template>
    <div>
        <iframe
        class="rounded"
        style="border: 2px solid rgba(111,111,111,1)"
        width="350"
        height="250"
        frameborder="0"
        referrerpolicy="no-referrer-when-downgrade"
        :src="API_URL"
        allowfullscreen>
</iframe>

    </div>
</template>

<script setup>
    const API_URL = `https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_API_KEY}&center=37.4218,-122.0840`
</script>

<style lang="scss" scoped>

</style>