<script setup>
const props = defineProps({
  title: {
    type: String,
  }
})
</script>

<template>
  <q-card dense flat bordered>
    <q-card-section class="q-mx-md">
      <div class="text-h5">{{ title }}</div>
    </q-card-section>
  </q-card>
  <div class="q-pa-lg">
    <q-card dense flat bordered class="q-mt">
      <q-card-section class="q-mx-md">
        <slot></slot>
      </q-card-section>
    </q-card>
  </div>
</template>

<style></style>
