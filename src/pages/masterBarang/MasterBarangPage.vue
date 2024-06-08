<script setup>
import PageConteiner from "components/PageConteiner.vue";
import AppTable from "components/AppTable.vue";
import {ref} from "vue";
import {getListBarang, getJenisBarang, postBarang, putBarang, delBarang} from "src/lib/api";
import AppModal from "components/AppModal.vue";
import PreloadedSelect from "components/PreloadedSelect.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const columnBarang = [
  {
    label: 'No',
    name: 'no',
    field: 'no',
    align: 'center'
  },
  {
    label: 'Nama Barang',
    name: 'nama',
    field: 'nama',
    align: 'left'
  },
  {
    label: 'Jenis Barang',
    name: 'jenis',
    field: row => row.jenis_barang.nama,
    align: 'left'
  },
  {
    label: 'Stok saat ini',
    name: 'stok_barang',
    field: 'stok_barang',
    align: 'center'
  },
  {
    label: 'Aksi',
    name: 'action',
    field: 'action',
    align: 'center'
  }
];

const tableRef = ref(null);

const form = ref({
  id: 0,
  nama: '',
  stok_barang: 0,
  jenis_id: null,
});

const modalTitle = ref('Tambah Data');
const rows = ref([]);
const modal = ref(false);
const filter = ref('');
const mode = ref('CREATE');

const fetchMasterBarang = async (offset, limit) => {
  const params = {
    start: offset,
    limit,
    filter: filter.value
  }
  return await getListBarang(params)
    .then(async (res) => {
      return {
        rows: await res.data,
        total: await res.total
      }
    })
}

const optionsJenisBarang = ref([]);

const handleCreate = () => {
  form.value.nama = '';
  form.value.jenis_id = null;
  modalTitle.value = 'Tambah Data'
  mode.value = 'CREATE'
  modal.value = true;
}

const handleUpdate = (row) => {
  mode.value = 'UPDATE'
  form.value.id = row?.id
  form.value.nama = row?.nama
  form.value.jenis_id = row?.jenis_id;
  form.value.stok_barang = row?.stok_barang;
  modal.value = true;
}

const onStore = () => {
 if(mode.value === 'CREATE') {
   onSaveBarang()
 } else {
   onUpdateBarang()
 }
}

const onSaveBarang = () => {
  form.value.jenis_id = form.value.jenis_id.id
  postBarang(form.value)
    .then((res) => {
      $q.notify({
        type: 'positive',
        message: 'Berhasil menambahkan data'
      })
      tableRef.value.reset();
    })
    .catch((res) => {
      $q.notify({
        type: 'negative',
        message: 'Terjadi Kesalahan'
      })
      modal.value = false;
    })
    .finally(() => {
      modal.value = false;
    });
}

const onUpdateBarang = () => {
  putBarang(form.value.id, form.value)
    .then((res) => {
      $q.notify({
        type: 'positive',
        message: 'Berhasil mengubah data'
      })
      modal.value = false;
      tableRef.value.reset();
    })
    .catch((res) => {
      $q.notify({
        type: 'negative',
        message: 'Terjadi Kesalahan'
      })
      modal.value = false;
    })
    .finally(() => {
      modal.value = false;
    });
}

const handleDelete = (id) => {
  $q.dialog({
    title: 'Konfirmasi',
    message: 'Apakah anda yakin akan menghapus data?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    delBarang(id)
      .then((res) => {
        $q.notify({
          type: 'positive',
          message: res.message || 'Berhasil menghapus data'
        })
        tableRef.value.reset();

      })
      .catch((res) => {
        $q.notify({
          type: 'negative',
          message: res.error.message || 'Terjadi kesalahan'
        })
      })
  })
}

</script>

<template>
  <PageConteiner title="Master Barang">
    <div class="flex justify-end q-mb-md">
      <q-btn icon="add" color="primary" unelevated label="Tambah" @click="handleCreate"></q-btn>
    </div>
    <AppTable
      ref="tableRef"
      :columns="columnBarang"
      v-model:rows="rows"
      :fetch="fetchMasterBarang"
      enableFilter
      v-model:keyword="filter"
    >
      <template v-slot:body-cell-no="props">
        <q-td :props="props">
          {{props.rowIndex + 1}}
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn-group unelevated>
            <q-btn icon="edit" size="sm" color="orange" dense unelevated @click="handleUpdate(props?.row)"/>
            <q-btn icon="delete" size="sm" color="red" dense unelevated @click="handleDelete(props?.row?.id)" />
          </q-btn-group>
        </q-td>
      </template>
    </AppTable>
    <AppModal title="Tambah Data" v-model:modal="modal" @save="onStore">
      <div class="q-mb-lg q-gutter-sm">
        <div>Nama Barang</div>
        <q-input v-model="form.nama" outlined dense/>
      </div>
      <div class="q-mb-lg q-gutter-sm">
        <div>Stok</div>
        <q-input v-model="form.stok_barang" outlined dense/>
      </div>
      <div class="q-mb-lg q-gutter-sm">
        <div>Jenis Barang</div>
        <PreloadedSelect
          emit-value
          :fetch="getJenisBarang"
          v-model="form.jenis_id"
          v-model:options="optionsJenisBarang"
        />
      </div>
    </AppModal>
  </PageConteiner>
</template>

<style scoped></style>
