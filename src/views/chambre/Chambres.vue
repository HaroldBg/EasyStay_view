<script setup>

import ChambreStats from "../widgets/ChambreStats.vue";
import {
  CTable,
  CTableBody, CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/vue/dist/esm/components/table";
import {ref} from "vue";
import {CButton} from "@coreui/vue/dist/esm/components/button";
import {CBadge} from "@coreui/vue/dist/esm/components/badge";
import {CCard, CCardBody} from "@coreui/vue/dist/esm/components/card";

const details = ref([])

//tableau example
const columns = [
  {
    key: 'id',
    label: 'N°',
    _props: {scope: 'col'},
  },
  {
    key: 'types',
    _props: {scope: 'col'},
  },
  {
    key: 'tarif_nuit',
    label: 'Tarif/nuit',
    _props: {scope: 'col'},
  },
  {
    key: 'status',
    label: 'Satut',
    _props: {scope: 'col'},
  },
  {
    key: 'actions',
    label: 'Actions',
    _props: {scope: 'col'},
  },
]
const items = [
  {
    id: 1,
    types: 'Chambre simple',
    tarif_nuit: '7800 ',
    status: 'Disponible',
  }, {
    id: 2,
    types: 'Chambre double',
    tarif_nuit: '17500 ',
    status: 'Occupé',
  }, {
    id: 3,
    types: 'Chambre simple',
    tarif_nuit: '7500 ',
    status: 'Reservé',
  }, {
    id: 4,
    types: 'Duplex',
    tarif_nuit: '7500 ',
    status: 'Maintenance',
  }, {
    id: 5,
    types: 'Penthouse',
    tarif_nuit: '7500 ',
    status: 'Disponible',
  }, {
    id: 6,
    types: 'Chambre simple',
    tarif_nuit: '7500 ',
    status: 'Disponible',
  }, {
    id: 7,
    types: 'Duplex',
    tarif_nuit: '7500 ',
    status: 'Maintenance',
  }, {
    id: 8,
    types: 'Penthouse',
    tarif_nuit: '7500 ',
    status: 'Disponible',
  }, {
    id: 9,
    types: 'Chambre simple',
    tarif_nuit: '7500 ',
    status: 'Disponible',
  },
]
// get status
const getBadge = (status) => {
  switch (status) {
    case 'Reservé':
      return 'success'
    case 'Disponible':
      return 'primary'
    case 'Occupé':
      return 'warning'
    case 'Maintenance':
      return 'danger'
    default:
      'primary'
  }
}

const toggleDetails = item => {
  if (details.value.includes(item.id)) {
    details.value = details.value.filter((_item) => _item !== item.id)
    return
  }

  details.value.push(item.id)
}
</script>

<template>
  <div>
    <ChambreStats class="mb-4"/>
    <div class="w-100 d-flex flex-row-reverse align-items-end">
      <CButton
        class="mx-1"
        color="secondary"
        size="md"
        square
      >
        Rechercher
      </CButton>
      <router-link :to="{name: 'Chambres.create'}" class="btn btn-dark  mx-1">Ajouter chambre</router-link>
    </div>
    <div class="mt-4">

      <CCard class="mb-4">
        <CCardBody>
          <CTable caption="top" hover>
            <CTableCaption class="fs-3">Liste des chambres</CTableCaption>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">N°</CTableHeaderCell>
                <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Tarif/nuit</CTableHeaderCell>
                <CTableHeaderCell scope="col">Statut</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>

              <CTableRow v-for="item in items" :key="item.name">
                <CTableHeaderCell scope="row">{{ item.id }}</CTableHeaderCell>
                <CTableDataCell>{{ item.types }}</CTableDataCell>
                <CTableDataCell>{{ item.tarif_nuit }} FCFA</CTableDataCell>
                <CTableDataCell>
                  <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
                </CTableDataCell>
                <CTableDataCell class="align-items-center">
                  <CButton
                    class="mx-1"
                    color="primary"
                    size="sm"
                    square
                    variant="outline"
                    @click="toggleDetails(item)"
                  >
                    {{ Boolean(item._toggled) ? 'Hide' : 'Détails' }}
                  </CButton>
                  <CButton
                    class="mx-1"
                    color="warning"
                    size="sm"
                    square
                    variant="outline"
                    @click="toggleDetails(item)"
                  >
                    Modifier
                  </CButton>
                  <CButton
                    class="mx-1"
                    color="danger"
                    size="sm"
                    square
                    variant="outline"
                    @click="toggleDetails(item)"
                  >
                    Supprimer
                  </CButton>
                </CTableDataCell>
              </CTableRow>

            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
