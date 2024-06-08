<script setup>
import {computed, onMounted, ref, watch} from 'vue';

const input = ref();
const isLoading = ref(false);
const isFailed = ref(false);

const props = defineProps({
  modelValue: Number,
  options: Array,
  emitValue: Boolean,
  fetch: Function
})

const options = ref(props.options);


const emits = defineEmits(['update: modelValue', 'update: options'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => emits('update: modelValue', v)
});

onMounted(() => {
  onFetchData();
});

const retry = () => {
  onFetchData();
};

const onFetchData = () => {
  isLoading.value = true;
  props
    .fetch()
    .then((res) => {
      options.value = res.data;
      isFailed.value = false;
    })
    .catch(() => {
      isFailed.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

watch(
  () => options.value,
  (v) => {
    console.log(v)
    emits('update: options', v);
  }
);
</script>

<template>
  <q-select
    ref="input"
    v-model="model"
    dense
    outlined
    option-label="nama"
    option-value="id"
    :options="options"
    :disable="isLoading"
    map-options
    v-bind="{ ...$attrs }"
    :loading="isLoading"
  >
  </q-select>
  <div v-if="isFailed" class="flex justify-end q-mt-xs">
    <q-btn label="retry" @click="retry"/>
  </div>
</template>
