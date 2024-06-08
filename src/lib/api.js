import {get, post, put, del} from 'src/lib/HttpHelpers'

export const getListBarang = (params) => {
  return get({path: '/barang', params});
}

export const postBarang = (params) => {
  return post({path: '/barang', params});
}

export const putBarang = (id, params) => {
  return put({path: '/barang/' + id, params});
}

export const delBarang = (params) => {
  return del({path: `/barang/${params}`});
}

export const getJenisBarang = (params) => {
  return get({path: '/jenis-barang', params});
}

export const postJenisBarang = (params) => {
  return post({path: '/jenis-barang', params});
}

export const putJenisBarang = (id, params) => {
  return put({path: '/jenis-barang/' + id, params});
}

export const delJenisBarang = (id) => {
  return del({path: `/jenis-barang/${id}`});
}

export const getTransaksi = (params) => {
  return get({path: '/transaksi', params})
}

export const postTransaksi = (params) => {
  return post({path: '/transaksi', params})
}

export const putTransaksi = (id, params) => {
  return post({path: '/transaksi/' + id, params})
}

export const delTransaksi = (id) => {
  return del({path: `/transaksi/${id}`});
}

export const getCompare = (params) => {
  return get({path: '/transaksi/compare', params})
}
