<script setup>
import PageConteiner from "components/PageConteiner.vue";
import AppTable from "components/AppTable.vue";
import {ref} from "vue";
import {
  delBarang,
  delJenisBarang,
  getJenisBarang,
  postBarang,
  postJenisBarang,
  putBarang,
  putJenisBarang
} from "src/lib/api";
import dayjs from "dayjs";
import AppModal from "components/AppModal.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const tableRef = ref(null);
const modalTitle = ref('Tambah Data');
const columns = [
  {
    label: 'No',
    name: 'no',
    field: 'no',
    align: 'center'
  },
  {
    label: 'Nama',
    name: 'nama',
    field: 'nama',
    align: 'left'
  },
  {
    label: 'Tanggal Dibuat',
    name: 'created_at',
    field: row => dayjs(row?.created_at).format('MMMM D, YYYY'),
    align: 'left'
  },
  {
    label: 'Aksi',
    name: 'action',
    field: 'action',
    align: 'center'
  }
];

const modal = ref(false);
const mode = ref('CREATE');

const filter = ref('');
const form = ref({
  nama: ''
})

const fetchMasterJenisBarang = async (offset, limit) => {
  const params = {
    start: offset,
    limit,
    filter: filter.value
  }
  return await getJenisBarang(params)
    .then(async (res) => {
      return {
        rows: await res.data,
        total: await res.total
      }
    })
}

const onStore = () => {
  if(mode.value === 'CREATE') {
    onSave()
  } else {
    onUpdate()
  }
}

const handleCreate = () => {
  mode.value = 'CREATE'
  modalTitle.value = 'Tambah Data'
  form.value.nama = '';
  modal.value = true;
}

const handleUpdate = (row) => {
  mode.value = 'update'
  modalTitle.value = 'Ubah Data'
  form.value.id = row?.id;
  form.value.nama = row?.nama;
  modal.value = true;
}

const onSave = () => {
  postJenisBarang(form.value)
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

const onUpdate = () => {
  putJenisBarang(form.value.id, form.value)
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

const onDelete = (id) => {
  $q.dialog({
    title: 'Konfirmasi',
    message: 'Apakah anda yakin akan menghapus data?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    delJenisBarang(id)
      .then((res) => {
        $q.notify({
          type: 'positive',
          message: res.message || 'Data berhasil di ubah'
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

const rows = ref([]);
</script>

<template>
  <PageConteiner title="Master Jenis Barang">
    <div class="flex justify-end q-mb-md">
      <q-btn icon="add" color="primary" unelevated label="Tambah" @click="handleCreate"></q-btn>
    </div>
    <AppTable
      :columns="columns"
      v-model:rows="rows"
      :fetch="fetchMasterJenisBarang"
      ref="tableRef"
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
            <q-btn icon="delete" size="sm" color="red" dense unelevated @click="onDelete(props?.row?.id)" />
          </q-btn-group>
        </q-td>
      </template>
    </AppTable>
    <AppModal :title="modalTitle" v-model:modal="modal" @save="onStore">
      <div class="q-mb-lg q-gutter-sm">
        <div>Nama Jenis Barang</div>
        <q-input v-model="form.nama" outlined dense/>
      </div>
    </AppModal>
  </PageConteiner>
</template>

<style scoped></style>
