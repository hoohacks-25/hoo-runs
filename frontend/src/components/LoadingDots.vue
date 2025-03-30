<template>
    <transition name="fade">
        <div class="main text-sm">
        <div><strong>Generating route</strong></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
    </transition>
</template>

<script setup>

</script>

<style scoped>
    div.main {
        margin: auto;
        display: flex;
        flex-direction: row;
        height: fit-content;
        gap: 3px;
        align-items: end;
    }
    div.dot {
        margin-bottom: 0.3rem;
        animation: scaling 2.5s ease-out infinite;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: gray;
    }

    div.dot:nth-child(2) {
        animation-delay: 0.2s
    }
    div.dot:nth-child(3) {
        animation-delay: 0.4s
    }
    div.dot:nth-child(4) {
        animation-delay: 0.6s
    }


    @keyframes scaling {
        50% {
            transform: scale(0.2);
        }
        100%,0% {
            transform: scale(1);
        }
    }

</style>

<style>

</style>