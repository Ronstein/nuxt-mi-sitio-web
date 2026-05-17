<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <UError
    :error="error"
    :clear="{
      size: 'xl',
      icon: 'i-lucide-arrow-left',
      //icon: 'mdi:arrow-decision-outline',
      class: 'rounded-full',
      // label: 'IR al home',
    }"
    :ui="{
      statusCode: 'text-9xl font-thin animate-pulse',
    }"
  />
</template>
