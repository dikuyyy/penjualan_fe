<script setup>
import PageConteiner from "components/PageConteiner.vue";
import AppTable from "components/AppTable.vue";
import {computed, ref} from "vue";
import {getListBarang, getTransaksi, postBarang, postTransaksi, putBarang, putTransaksi} from "src/lib/api";
import AppModal from "components/AppModal.vue";
import PreloadedSelect from "components/PreloadedSelect.vue";
import DateInput from "components/DateInput.vue";
import dayjs from "dayjs";
import {useQuasar} from "quasar";
import FilterCard from "components/FilterCard.vue";

const $q = useQuasar();
const tableRef = ref(null);
const columns = [
  {
    label: 'No',
    name: 'no',
    field: 'no',
    align: 'center'
  },
  {
    label: 'Nama Barang',
    name: 'nama_barang',
    field: 'nama_barang',
    align: 'left'
  },
  {
    label: 'Stok',
    name: 'stok',
    field: 'stok',
    align: 'right'
  },
  {
    label: 'Jumlah Terjual',
    name: 'jumlah_terjual',
    field: 'jumlah_terjual',
    align: 'right'
  },
  {
    label: 'Tanggal Transaksi',
    name: 'tanggal_transaksi',
    field: 'tanggal_transaksi',
    align: 'center'
  },
  {
    label: 'Jenis Barang',
    name: 'jenis_barang',
    field: 'jenis_barang',
    align: 'left'
  }
];

const optionsBarang = ref([]);

const form = ref({
  barang: null,
  jumlah_terjual: null,
  tanggal_transaksi: dayjs(new Date).format('DD-MM-YYYY'),
});

const modal = ref(false);
const mode = ref('CREATE');
const rows = ref([]);
const filter = ref('');
const order_by = ref('desc');
const sort_by = ref('id');

const optionSortBy = [
  {
    label: 'Id',
    value: 'id'
  },
  {
    label: 'Jumlah Terjual',
    value: 'jumlah_terjual'
  },
  {
    label: 'Nama Barang',
    value: 'nama_barang'
  },
  {
    label: 'Tanggal Transaksi',
    value: 'tanggal_transaksi'
  }
]

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

const reset = () => {
  tableRef.value.reset();
}

const fetchTransaksi = async (offset, limit) => {
  const params = {
    sort: sort_by.value,
    order: order_by.value,
    start: offset,
    limit,
    filter: filter.value
  }
  return await getTransaksi(params)
    .then(async (res) => {
      return {
        rows: await res.data,
        total: await res.total
      }
    })
}

const handleCreate = () => {
  const day = dayjs(new Date).format('DD-MM-YYYY');
  form.value.barang = null;
  form.value.jumlah_terjual = null;
  form.value.tanggal_transaksi = day;
  mode.value = 'CREATE'
  modal.value = true;
}

const onStore = () => {
  onSaveBarang()
}

const onSaveBarang = () => {
  const params = {
    barang_id: form.value.barang?.id,
    jumlah_terjual: form.value.jumlah_terjual,
    tanggal_transaksi: dayjs(form.value.tanggal_transaksi).format('YYYY-MM-DD')
  }
  postTransaksi(params)
    .then((res) => {
      $q.notify({
        type: 'positive',
        message: res.message || 'Berhasil menambahkan data'
      })
      tableRef.value.reset();
    })
    .catch((res) => {
      $q.notify({
        type: 'negative',
        message: res.error.message || 'Terjadi kesalahan'
      })
      modal.value = false;
    })
    .finally(() => {
      modal.value = false;
    });
}

const stok_barang = computed(() => {
  if (form.value.barang !== null) {
    return form.value.barang.stok_barang
  }
  return null;
})

</script>

<template>
  <PageConteiner title="Transaksi">
    <FilterCard class="q-mb-lg" @filter="reset">
      <div class="row q-col-gutter-md">
        <div class="col-6 q-col-gutter-y-md">
          <q-select :options="optionSortBy" map-options emit-value option-value="value" option-label="label" v-model="sort_by" outlined dense label="Sorting Berdasarkan"/>
        </div>
        <div class="col-6 q-col-gutter-y-md">
          <q-select :options="optionOrderBy" map-options emit-value option-value="value" option-label="label" v-model="order_by" outlined dense label="Order Berdasarkan"/>
        </div>
      </div>
    </FilterCard>
    <div class="flex justify-end q-mb-md">
      <q-btn icon="add" color="primary" unelevated label="Tambah" @click="handleCreate"></q-btn>
    </div>
    <AppTable
      :columns="columns"
      v-model:rows="rows"
      :fetch="fetchTransaksi"
      enableFilter
      v-model:keyword="filter"
      ref="tableRef"
    >
      <template v-slot:body-cell-no="props">
        <q-td :props="props">
          {{ props.rowIndex + 1 }}
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn-group unelevated>
            <q-btn icon="edit" size="sm" color="orange" dense unelevated @click="handleUpdate(props?.row)"/>
            <q-btn icon="delete" size="sm" color="red" dense unelevated @click="handleDelete(props?.row?.id)"/>
          </q-btn-group>
        </q-td>
      </template>
    </AppTable>
    <AppModal :title="mode === 'CREATE' ? 'Tambah Data' : 'Ubah Data'" v-model:modal="modal" @save="onStore">
      <div class="q-mb-lg q-gutter-sm">
        <div>Nama Barang</div>
        <PreloadedSelect
          :fetch="getListBarang"
          v-model="form.barang"
          v-model:options="optionsBarang"
          :emit-value="mode === 'UPDATE'"
        />
      </div>
      <div class="q-mb-lg q-gutter-sm" :hidden="mode === 'UPDATE'">
        <div>Stok</div>
        <q-input :model-value="stok_barang" outlined dense readonly disable/>
      </div>
      <div class="q-mb-lg q-gutter-sm">
        <div>Jumlah Terjual</div>
        <q-input v-model="form.jumlah_terjual" outlined dense/>
      </div>
      <div class="q-mb-lg q-gutter-sm">
        <div>Tanggal Transaksi</div>
        <DateInput v-model="form.tanggal_transaksi"/>
      </div>
    </AppModal>
  </PageConteiner>
</template>

<style scoped>

</style>
