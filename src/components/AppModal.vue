<script setup>
import {computed} from "vue";

const props = defineProps({
  modal: {
    type: Boolean,
    default: false
  },
  title: {
    type: String
  }
})

const emits = defineEmits(['update:modal', 'save']);

const modal = computed({
  get() {
    return props.modal
  },
  set(value) {
    emits('update:modal', value);
  }
})

</script>

<template>
  <q-dialog
    v-model="modal"
  >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">{{title}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <slot></slot>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat class="text-secondary" label="Batal" v-close-popup/>
        <q-btn class="bg-primary text-white" label="Simpan" icon="save" @click="emits('save')"  />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
