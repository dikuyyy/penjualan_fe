<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits(['reset', 'filter'])
const expanded = ref(false);
</script>

<template>
  <q-expansion-item
    v-model="expanded"
    icon="filter_alt"
    label="Filter"
    class="filter-card"
    expand-icon-class="text-white"
    header-class="text-white bg-grey"
  >
    <q-card>
      <q-card-section class="q-px-lg q-py-md">
        <slot></slot>
      </q-card-section>
      <q-card-actions align="right" class="filter-card-actions q-px-lg q-pb-md">
        <q-btn outline icon="refresh" label="Reset" @click="$emit('reset')" color="primary" />
        <q-btn
          unelevated
          icon="filter_alt"
          label="Filter"
          @click="$emit('filter')"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-expansion-item>
</template>

<style scoped></style>
