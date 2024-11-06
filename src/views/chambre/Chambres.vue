<script setup>

import ChambreStats from "../widgets/ChambreStats.vue";

import {onMounted, ref} from "vue";
import {CButton} from "@coreui/vue/dist/esm/components/button";
import {CBadge} from "@coreui/vue/dist/esm/components/badge";
import {VCard, VDataTable, VTextField} from "vuetify/components";
import {format} from "date-fns";
// Original date string
const dateString = '2025-06-24T00:00:00.000000Z';

// Method to format date with French locale
function formatDate(date) {
  return format(new Date(date), 'dd MMMM yyyy', { locale: fr });
}
// Function to calculate the number of nights between two dates
function calculateNights(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const differenceInTime = endDate - startDate; // Difference in milliseconds
  return differenceInTime / (1000 * 60 * 60 * 24); // Convert to days
}
// Define local properties
const itemsPerPage = 10;
const search = ref('');
const headers = [

  { title: 'Num', align: 'start', key: 'num' },
  { title: 'Description', align: 'start', key: 'description' },
  { title: 'Types ', align: 'start', key: 'type' },
  { title: 'Capacité ', align: 'start', key: 'capacity' },
  { title: 'Caractéristique ', align: 'start', key: 'features' },
  { title: 'Statut', align: 'start', key: 'statut' },
  { title: 'Actions', align: 'start', key: 'action', sortable: false, },
];
// State to hold reservations data
const rooms = ref([]);
async function fetchChambre() {
  const token = localStorage.getItem('token'); // Assumes token is stored in localStorage

  try {
    const response = await fetch('http://127.0.0.1:8000/api/chambre/showAll', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Use the token for authorization
        'Content-Type': 'application/json'
      }
    });
    rooms.value = await response.json();
    console.log(rooms.value);
  } catch (error) {
    console.error(error.message);
  }
}
// Fetch reservations when component mounts
onMounted(() => {
  fetchChambre();
});
// get all reservation by user connected

const apiUrlPic = 'http://127.0.0.1:8000/storage/';
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


</script>

<template>
  <div>
    <div class="w-100 d-flex flex-row-reverse align-items-end">
      <router-link :to="{name: 'Chambres.create'}" class="btn btn-dark  mx-1">Ajouter chambre</router-link>
    </div>
    <div class="mt-4">
      <v-card
        color="surface-light"
        class="p-2"
      >
        <div class="d-flex flex-row justify-content-end">
          <div class="col-3 mt-3">
            <v-text-field
              v-model="search"
              :loading="loading"
              label="Recherche"
              placeholder="Rechercher Hôtel"
              append-inner-icon="mdi-magnify"
              outlined
              clearable
            />
          </div>
        </div>
        <v-data-table
          :items="rooms.chambres"
          :headers="headers"
          :items-per-page="itemsPerPage"
          :search="search"
        >
          <template #item.type="{ item }">
            <div class="text-dark fw-bold">
              {{ item.types_chambre.name }}
            </div>
          </template>
          <template #item.capacity="{ item }">
            <div class="text-dark fw-bold">
              {{ item.types_chambre.capacity }}
            </div>
          </template>

          <template #item.features="{ item }">
            <div class="text-dark fw-bold">
              {{ item.types_chambre.features }}
            </div>
          </template>
          <template #item.statut="{ item }">
            <CBadge
              :color="getBadge(item.statut)"
              style="font-size:14px;"
            >
              {{ item.statut }}
            </CBadge>
          </template>
          <template #item.action="{ item }">
            <div v-if="item.statut == 'Disponible'" >
              <CButton
                size="sm"
                color="secondary"
                class="mx-1"
              >
                <font-awesome-icon :icon="['fas', 'pen']" color="white"/>
              </CButton>
              <CButton
                size="sm"
                color="primary"
              >
                <font-awesome-icon :icon="['fas', 'circle-info']" color="white"/>
              </CButton>
              <CButton
                size="sm"
                color="success"
                class="mx-1"
              >
                <font-awesome-icon :icon="['fas', 'screwdriver-wrench']" color="white"/>
              </CButton>


            </div>
            <div v-if="item.status == 'Check-in'">
              <CButton
                size="sm"
                color="danger"
              >
                <font-awesome-icon :icon="['fas', 'trash-can']" color="white"/>
              </CButton>
              <CButton
                size="sm"
                color="primary"
              >
                <font-awesome-icon :icon="['fas', 'circle-info']" color="white"/>
              </CButton>
              <CButton
                size="sm"
                color="danger"
              >
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" color="white"/>
              </CButton>
            </div>
            <div v-if="item.status == 'Check-out'">
              <CButton
                size="sm"
                color="primary"
              >
                <font-awesome-icon :icon="['fas', 'circle-info']" color="white"/>
              </CButton>
              <CButton
                size="sm"
                color="dark"
              >
                <font-awesome-icon :icon="['fas', 'file']" white/>
              </CButton>
            </div>
            <div v-if="item.status == 'Confirmé'" >
              <CButton
                size="sm"
                color="secondary"
                class="mx-2"
              >
                <font-awesome-icon :icon="['fas', 'pen']" color="white"/>
              </CButton>
              <CButton
                size="sm"
                color="primary"
              >
                <font-awesome-icon :icon="['fas', 'circle-info']" color="white"/>
              </CButton>
              <CButton
                size="sm"
                color="success"
                class="mx-2"
              >
                <font-awesome-icon :icon="['fas', 'right-to-bracket']" color="white" />
              </CButton>

            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
