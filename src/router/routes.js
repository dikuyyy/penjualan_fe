import MainLayout from "layouts/MainLayout.vue";
import HomePage from "pages/homePage/HomePage.vue";
import MasterBarangPage from "pages/masterBarang/MasterBarangPage.vue";
import MasterJenisBarangPage from "pages/masterJenisBarang/MasterJenisBarangPage.vue";
import TransaksiPage from "pages/transaksi/TransaksiPage.vue";
import CompareBarangPage from "pages/compare/CompareBarangPage.vue";

const useRoutes = (routes) => {
  return routes.map((route) => ({
    ...route,
    meta: {
      layout: MainLayout,
      ...route.meta
    }
  }))
}

const routes = useRoutes([
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/barang',
    name: 'barang',
    component: MasterBarangPage
  },
  {
    path: '/jenis-barang',
    name: 'jenis-barang',
    component: MasterJenisBarangPage
  },
  {
    path: '/transaksi',
    name: 'transaksi',
    component: TransaksiPage
  },
  {
    path: '/compare',
    name: 'compare',
    component: CompareBarangPage
  }
])

export default routes
