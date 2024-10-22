<script setup>

import {CButton} from "@coreui/vue/dist/esm/components/button";
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
import avatar1 from "@/assets/images/avatars/1.jpg";
const items = [
  {
    mat: 1,
    client:{
      src:avatar1,
      name:'AVADEME Harold'
    },
    number: '+229 91461545',
    mail:'haroldavademe0@gmail.Com',
  },{
    mat: 2,
    client:{
      src: avatar1,
      name: 'JOHNSON Alice'
    },
    number: '+229 91234567',
    mail: 'alice.johnson@example.com'
  },
  {
    mat: 3,
    client:{
      src: avatar1,
      name: 'DOE John'
    },
    number: '+229 92345678',
    mail: 'john.doe@example.com'
  },
  {
    mat: 4,
    client:{
      src: avatar1,
      name: 'SMITH Clara'
    },
    number: '+229 93456789',
    mail: 'clara.smith@example.com'
  },{
    mat: 5,
    client:{
      src: avatar1,
      name: 'BROWN Michael'
    },
    number: '+229 94567890',
    mail: 'michael.brown@example.com'
  },
  {
    mat: 6,
    client:{
      src: avatar1,
      name: 'WILSON Emma'
    },
    number: '+229 95678901',
    mail: 'emma.wilson@example.com'
  },
  {
    mat: 7,
    client:{
      src: avatar1,
      name: 'TAYLOR Robert'
    },
    number: '+229 96789012',
    mail: 'robert.taylor@example.com'
  },
  {
    mat: 8,
    client:{
      src: avatar1,
      name: 'MILLER Sophia'
    },
    number: '+229 97890123',
    mail: 'sophia.miller@example.com'
  },
  {
    mat: 9,
    client:{
      src: avatar1,
      name: 'DAVIS James'
    },
    number: '+229 98901234',
    mail: 'james.davis@example.com'
  },
  {
    mat: 10,
    client:{
      src: avatar1,
      name: 'LEE Olivia'
    },
    number: '+229 99012345',
    mail: 'olivia.lee@example.com'
  }
]
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
          <CTableCaption class="fs-3">Liste des Employés</CTableCaption>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">N°</CTableHeaderCell>
              <CTableHeaderCell scope="col">Employé</CTableHeaderCell>
              <CTableHeaderCell scope="col">Numéro</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mail</CTableHeaderCell>
              <CTableHeaderCell scope="col" >Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>

            <CTableRow  v-for="item in items" :key="item.name">
              <CTableHeaderCell scope="row" class="py-3">{{ item.mat }}</CTableHeaderCell>
              <CTableDataCell class="text-center d-flex flex-row align-items-center justify-content-between">
                <CAvatar size="md" :src="item.client.src" />
                <div>{{ item.client.name }}</div>
              </CTableDataCell>
              <CTableDataCell class="py-3">{{ item.number }} </CTableDataCell>
              <CTableDataCell class="py-3">{{ item.mail }} </CTableDataCell>
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
                  Supprimer
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
