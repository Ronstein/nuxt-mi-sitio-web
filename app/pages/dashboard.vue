<template>
  <div>
    <!-- renderizar hijos -->
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard-layout",
  middleware: ["auth"],
});
</script>
