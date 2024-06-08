<script setup>
import { RouterView } from 'vue-router';

</script>


<template>
  <component :is="$route.meta.layout">
    <RouterView />
  </component>
</template>
