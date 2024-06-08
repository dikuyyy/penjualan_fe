<script setup>

import {computed} from "vue";

const props = defineProps({
  errors: {
    type: Array,
    default: null,
  },
  hideBottomSpace: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  modelValue: null
})

const emits = defineEmits(['update:modelValue']);

const model = computed({
  get(){
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value);
  }
})
</script>

<template>
  <q-input
    class="full-width"
    outlined
    v-model="model"
    dense
    clearable
    @click="!readonly ? $refs.dateProxy.show() : ''"
    :readonly="readonly"
    :error="!!errors?.length && errors?.length > 0"
    :hide-bottom-space="hideBottomSpace"
    v-bind="{ ...$attrs, ...$props, ...$slots }"
  >
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="dateProxy"
          transition-show="scale"
          transition-hide="scale"
          v-if="!readonly"
        >
          <q-date v-model="model" mask="DD-MM-YYYY" :readonly="readonly" @input="$refs.dateProxy.hide()" />
        </q-popup-proxy>
      </q-icon>
    </template>
    <template v-slot:error>
      <slot name="error" v-if="!!errors?.length && errors?.length > 0">
        <div role="alert" v-for="err in errors" :key="err.$uid">
          {{ err?.$message }}
        </div>
      </slot>
    </template>
  </q-input>
</template>

<style scoped></style>
