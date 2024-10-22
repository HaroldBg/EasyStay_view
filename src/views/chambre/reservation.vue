<script setup>

import ReservationStats from "../widgets/ReservationStats.vue";
import {CButton} from "@coreui/vue/dist/esm/components/button";
import {
  CTable,
  CTableBody,
  CTableCaption, CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/vue/dist/esm/components/table";
import {CBadge} from "@coreui/vue/dist/esm/components/badge";
import {CAvatar} from "@coreui/vue/dist/esm/components/avatar";
import avatar1 from '@/assets/images/avatars/1.jpg'
import {CCard, CCardBody} from "@coreui/vue/dist/esm/components/card";

const items = [
  {
    mat: 1,
    nmCh: '2',
    client:{
      src:avatar1,
      name:'AVADEME Harold'
    },
    dateArr: '12/03/2024',
    dateDep:'16/03/2024',
    status: 'Check-in',
  },{
    mat: 2,
    nmCh: '3',
    client:{
      src:avatar1,
      name:'AVADEME Harold'
    },
    dateArr: '12/03/2024',
    dateDep:'16/03/2024',
    status: 'Check-in',
  },{
    mat: 3,
    nmCh: '5',
    client:{
      src:avatar1,
      name:'AVADEME Harold'
    },
    dateArr: '12/03/2024',
    dateDep:'16/03/2024',
    status: 'Check-in',
  },{
    mat: 4,
    nmCh: '6',
    client:{
      src:avatar1,
      name:'AVADEME Harold'
    },
    dateArr: '12/03/2024',
    dateDep:'16/03/2024',
    status: 'Check-in',
  },{
    mat: 5,
    nmCh: '7',
    client:{
      src:avatar1,
      name:'AVADEME Harold'
    },
    dateArr: '12/03/2024',
    dateDep:'16/03/2024',
    status: 'Check-in',
  },{
    mat: 6,
    nmCh: '8',
    client:{
      src:avatar1,
      name:'AVADEME Harold'
    },
    dateArr: '12/03/2024',
    dateDep:'16/03/2024',
    status: 'Check-in',
  },{
    mat: 7,
    nmCh: '9',
    client:{
      src:avatar1,
      name:'AVADEME Harold'
    },
    dateArr: '12/03/2024',
    dateDep:'16/03/2024',
    status: 'Check-in',
  },{
    mat: 8,
    nmCh: '6',
    client:{
      src:avatar1,
      name:'AVADEME Harold'
    },
    dateArr: '12/03/2024',
    dateDep:'16/03/2024',
    status: 'Check-in',
  },
]
const getBadge = (status) => {
  switch (status) {
    case 'Check-in':
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
  <div>
    <ReservationStats class="mb-4" />
  </div>
  <div class="w-100 d-flex flex-row-reverse align-items-end">
    <CButton
      color="secondary"
      square
      size="md"
      class="mx-1"
    >
      Rechercher
    </CButton>
    <CButton
      color="dark"
      square
      size="md"
      class="mx-1"
    >
       Ajouter
    </CButton>

  </div>

  <div class="mt-4">
    <CCard class="mb-4">
      <CCardBody>
        <CTable caption="top" hover >
      <CTableCaption class="fs-3">Liste des réservations</CTableCaption>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Matricule</CTableHeaderCell>
          <CTableHeaderCell scope="col">N° Chambre</CTableHeaderCell>
          <CTableHeaderCell scope="col">Client</CTableHeaderCell>
          <CTableHeaderCell scope="col">Date d'arrivé</CTableHeaderCell>
          <CTableHeaderCell scope="col">Date de départ</CTableHeaderCell>
          <CTableHeaderCell scope="col">Statut</CTableHeaderCell>
          <CTableHeaderCell scope="col" >Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>

        <CTableRow  v-for="item in items" :key="item.name">
          <CTableHeaderCell scope="row">{{ item.mat }}</CTableHeaderCell>
          <CTableDataCell>{{ item.nmCh }}</CTableDataCell>
          <CTableDataCell class="text-center d-flex flex-row align-items-center justify-content-between">
            <CAvatar size="md" :src="item.client.src" />
            <div>{{ item.client.name }}</div>
          </CTableDataCell>
          <CTableDataCell>{{ item.dateArr }} </CTableDataCell>
          <CTableDataCell>{{ item.dateDep }} </CTableDataCell>
          <CTableDataCell>
            <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
          </CTableDataCell>
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
            <CButton
              color="warning"
              variant="outline"
              square
              size="sm"
              @click="toggleDetails(item)"
              class="mx-1"
            >
              Modifier
            </CButton>
            <CButton
              color="danger"
              variant="outline"
              square
              size="sm"
              @click="toggleDetails(item)"
              class="mx-1"
            >
              Check-out <CIcon icon="cil-arrow-thick-from-left" size="sm" />
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
