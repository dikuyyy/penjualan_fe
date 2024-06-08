<script setup>
import PageConteiner from "components/PageConteiner.vue";
import {Bar} from 'vue-chartjs'
import {computed, onMounted, ref, watch} from "vue";

import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import {getCompare} from "src/lib/api";
import FilterCard from "components/FilterCard.vue";
import DateInput from "components/DateInput.vue";
import {useQuasar} from "quasar";
import dayjs from "dayjs";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartOptions = ref({
  responsive: true
})

const $q = useQuasar();
const dataCompare = ref({});
const chartRef = ref(null);

const chartData = computed(() => {
  return {
    labels: dataCompare.value.labels,
    datasets: [
      {
        label: '',
        backgroundColor: ['#f87979', '#36a2eb', '#ffcd56'],
        data: dataCompare.value.data
      }
    ]
  }
})

const fetchCompare = () => {
  const params = {
    order_by: orderBy.value,
  }
  if(startDate.value !== null && endDate.value !== null) {
    params.startDate = startDate.value
    params.endDate = endDate.value
    console.log(endDate.value);
  }
  getCompare(params)
    .then((res) => {
      const labels = [];
      const data = [];
      Object.keys(res.data).forEach((item) => {
        labels.push(item)
        data.push(res.data[item].total_terjual)
      })
      dataCompare.value.labels = labels
      dataCompare.value.data = data
    })
}

const optionOrderBy = [
  {
    label: 'Tertinggi',
    value: 'desc'
  },
  {
    label: 'Terendah',
    value: 'asc'
  }
]

const orderBy = ref('desc');
const startDate = ref(null);
const endDate = ref(null);
onMounted(() => {
  fetchCompare();
})

watch(orderBy, () => {
  fetchCompare()
})

const filter = () => {
  if (startDate.value == null && endDate.value == null) {
    $q.notify({
      type: 'warning',
      message: 'Pastikan tanggal mulai dan tanggal selesai terisi'
    })
    return;
  }
  fetchCompare();
}

</script>

<template>
  <PageConteiner title="Compare Jenis Barang">
    <FilterCard class="q-mb-lg" @filter="filter" title="Filter Berdasarkan tanggal">
      <div class="row q-col-gutter-md">
        <div class="col-6 q-col-gutter-y-md">
          <DateInput v-model="startDate" outlined dense label="Tanggal Mulai"/>
        </div>
        <div class="col-6 q-col-gutter-y-md">
          <DateInput v-model="endDate" outlined dense label="Tanggal Selesai"/>
        </div>
      </div>
    </FilterCard>
    <div class="flex justify-end">
      <q-select emit-value map-options v-model="orderBy" :options="optionOrderBy" outlined dense></q-select>
    </div>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
      ref="chartRef"
    />
  </PageConteiner>
</template>

<style scoped></style>
