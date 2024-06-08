<script setup>

import {computed, onMounted, ref} from "vue";

const props = defineProps({
  columns: Array,
  rows: Array,
  rowKey: String,
  dense: Boolean,
  enableFilter: Boolean,
  keyword: String,
  fetch: Function,
  initialSortBy: String,
  rowsPerPage: {
    type: Number,
    default: 10
  },
  hidePagination: Boolean,
  selection: String,
  selected: Array,
  title: String,
})

const emits = defineEmits(['update:keyword', 'update:rows']);

const slots = defineSlots();
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: props.rowsPerPage,
  rowsNumber: 10
})
const loading = ref(false);

const keyword = computed({
  get() {
    return props.keyword
  },
  set(value) {
    emits('update:keyword', value)
  }
})


const request = (requestProp) => {
  const {rowsPerPage, page} = requestProp.pagination
  if (props.fetch) {
    loading.value = true;
    props
      .fetch((page - 1) * rowsPerPage, rowsPerPage)
      .then((res) => {
        if (res) {
          emits('update:rows', res.rows);
          pagination.value.rowsNumber = res.total === undefined ? 0 : Number(res.total);
          pagination.value.page = page;
        }
      })
      .finally(() => {
        loading.value = false;
      })
  }
}

const reset = () => {
  const {page, rowsPerPage, descending, sortBy} = pagination.value;
  request({
    pagination: {
      page,
      rowsPerPage,
      descending,
      sortBy
    }
  });
}

defineExpose({
  reset
})

onMounted(() => {
  reset();
})


</script>

<template>
  <q-table
    v-bind="{ ...$props, ...$attrs }"
    hide-bottom-space
    :rows="rows"
    flat
    :rows-per-page-options="[5, 10, 25, 50, 100]"
    v-model:pagination="pagination"
    table-header-class="bg-table-header"
    :loading=loading
    @request="request"
  >
    <template v-slot:top-right v-if="enableFilter">
      <q-input
        outlined
        dense
        debounce="300"
        v-model="keyword"
        @keyup.enter="reset"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>
    </template>
    <template v-for="(_, name) in slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData"/>
    </template>
  </q-table>
</template>

<style>
.bg-table-header {
  background: #e7e7e7
}

.bg-fixed-table-row {
  background: #f3f3f3
}

.bg-table-header > th {
  font-weight: bold !important;
}
</style>
