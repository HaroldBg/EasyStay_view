<script setup>

import {CAvatar} from "@coreui/vue/dist/esm/components/avatar";
import {CCard, CCardBody} from "@coreui/vue/dist/esm/components/card";
import {
  CTable,
  CTableBody,
  CTableCaption, CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/vue/dist/esm/components/table";
import {CButton} from "@coreui/vue/dist/esm/components/button";
import avatar1 from "@/assets/images/avatars/1.jpg";
import {CBadge} from "@coreui/vue/dist/esm/components/badge";
const items = [
  {
    mat: 1,
    client:{
      src:avatar1,
      name:'AVADEME Harold'
    },
    number: 'FAC12B',
    total:'7000 FCFA',
    status:'En attente',
    date_crea:'12/03/2024'
  },{
    mat: 2,
    client:{
      src: avatar1,
      name: 'JOHNSON Alice'
    },
    number: 'FAC13B',
    total: '8500 FCFA',
    status: 'Solder',
    date_crea: '13/03/2024'
  },
  {
    mat: 3,
    client:{
      src: avatar1,
      name: 'DOE John'
    },
    number: 'FAC14B',
    total: '12000 FCFA',
    status: 'En attente',
    date_crea: '14/03/2024'
  },
  {
    mat: 4,
    client:{
      src: avatar1,
      name: 'SMITH Clara'
    },
    number: 'FAC15B',
    total: '5000 FCFA',
    status: 'Solder',
    date_crea: '15/03/2024'
  },
  {
    mat: 5,
    client:{
      src: avatar1,
      name: 'BROWN Michael'
    },
    number: 'FAC16B',
    total: '15000 FCFA',
    status: 'En attente',
    date_crea: '16/03/2024'
  },
  {
    mat: 6,
    client:{
      src: avatar1,
      name: 'WILSON Emma'
    },
    number: 'FAC17B',
    total: '10000 FCFA',
    status: 'Solder',
    date_crea: '17/03/2024'
  },
  {
    mat: 7,
    client:{
      src: avatar1,
      name: 'TAYLOR Robert'
    },
    number: 'FAC18B',
    total: '7500 FCFA',
    status: 'En attente',
    date_crea: '18/03/2024'
  }
]
const getBadge = (status) => {
  switch (status) {
    case 'Solder':
      return 'success'
    case 'Check-out':
      return 'primary'
    case 'En attente':
      return 'warning'
    case 'Annuler':
      return 'danger'
    default:
      'primary'
  }
}
</script>

<template>
  <div class="w-100 d-flex flex-row-reverse align-items-end">
    <CButton
        color="secondary"
        square
        size="md"
        class="mx-1"
    >
      Rechercher
    </CButton>
  </div>
  <div class="mt-4">
    <CCard class="mb-4">
      <CCardBody>
        <CTable caption="top" hover >
          <CTableCaption class="fs-3">Liste des Factures</CTableCaption>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">N°</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ref</CTableHeaderCell>
              <CTableHeaderCell scope="col">Client</CTableHeaderCell>
              <CTableHeaderCell scope="col">Total</CTableHeaderCell>
              <CTableHeaderCell scope="col">Statut</CTableHeaderCell>
              <CTableHeaderCell scope="col">Créé le</CTableHeaderCell>
              <CTableHeaderCell scope="col" >Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>

            <CTableRow  v-for="item in items" :key="item.name">
              <CTableHeaderCell scope="row" class="py-3">{{ item.mat }}</CTableHeaderCell>
              <CTableDataCell class="py-3">{{ item.number }} </CTableDataCell>
              <CTableDataCell class="text-center d-flex flex-row align-items-center justify-content-start">
                <CAvatar size="md" :src="item.client.src" class="mx-3"/>
                <div>{{ item.client.name }}</div>
              </CTableDataCell>
              <CTableDataCell class="py-3">{{ item.total }} </CTableDataCell>
              <CTableDataCell>
                <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
              </CTableDataCell>
              <CTableDataCell class="py-3">{{ item.date_crea }} </CTableDataCell>
              <CTableDataCell class="align-items-center">
                <CButton
                    color="primary"
                    variant="outline"
                    square
                    size="sm"
                    @click="toggleDetails(item)"
                    class="mx-1"
                >
                  {{ Boolean(item._toggled) ? 'Hide' : 'Détails' }}
                </CButton>
              </CTableDataCell>
            </CTableRow>

          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  </div>
</template>

<style scoped lang="scss">

</style>
