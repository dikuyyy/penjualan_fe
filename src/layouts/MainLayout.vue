<template>
  <q-layout view="lHh lpR lFf" class="bg-grey-2">
    <q-header elevated class="bg-white text-black" :style="{left: leftDrawerOpen ? '250px' : '0'}">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <div class="flex justify-end">
            Admin
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-scroll-area class="fit" style="background: #2C2E3E; color: white;">
        <div class="flex justify-center q-py-xl text-h5">Penjualan App</div>
        <q-list>
          <q-item clickable v-ripple :to="{name: 'home'}" active-class="text-yellow bg-red-6 q-py-xl">
            <q-item-section avatar>
              <q-icon name="home"></q-icon>
            </q-item-section>
            <q-item-section style="font-size: 17px">
              Home
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{name: 'transaksi'}" active-class="text-yellow bg-red-6 q-py-xl">
            <q-item-section avatar>
              <q-icon name="point_of_sale"></q-icon>
            </q-item-section>
            <q-item-section style="font-size: 17px">
              Transaksi
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{name: 'barang'}" active-class="text-yellow bg-red-6 q-py-xl">
            <q-item-section avatar>
              <q-icon name="assignment"></q-icon>
            </q-item-section>
            <q-item-section style="font-size: 17px">
              Master Barang
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{name: 'jenis-barang'}" active-class="text-yellow bg-red-6 q-py-xl">
            <q-item-section avatar>
              <q-icon name="assignment"></q-icon>
            </q-item-section>
            <q-item-section style="font-size: 17px">
              Master Jenis Barang
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{name: 'compare'}" active-class="text-yellow bg-red-6 q-py-xl">
            <q-item-section avatar>
              <q-icon name="assignment"></q-icon>
            </q-item-section>
            <q-item-section style="font-size: 17px">
              Compare Jenis
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container :style="{paddingLeft: leftDrawerOpen ? '250px' : '0'}">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>

<style>
.w-full {
  width: 100%;
}

.q-layout .q-item__section--avatar {
  min-width: 10px !important;
}

.q-layout .q-item {
  padding-top: 16px;
  padding-bottom: 16px;
}


aside {
  width: 250px !important;
}

</style>
