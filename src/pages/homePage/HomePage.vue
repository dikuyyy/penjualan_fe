<script setup>
import PageConteiner from "components/PageConteiner.vue";
const title = 'Halaman Utama'
</script>

<template>
  <PageConteiner :title="title">
    Halo, selamat datang di aplikasi Pencatatan Penjualan. Terdapat beberapa fitur dalam aplikasi ini, di antara nya:
    <ul>
      <li>Master Penjualan</li>
      <li>Tambah Data Barang</li>
      <li>Tambah Jenis Barang</li>
      <li>Tambah Transaksi</li>
      <li>Analisa Penjualan Terbanyan berdasarkan Jenis Barang</li>
    </ul>
  </PageConteiner>
</template>

<style></style>
