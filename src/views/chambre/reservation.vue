<script setup>

import ReservationStats from "../widgets/ReservationStats.vue";
import {CBadge} from "@coreui/vue/dist/esm/components/badge";
import {VCard, VDataTable, VTextField} from "vuetify/components";
import {onMounted, ref} from "vue";
import {CAvatar} from "@coreui/vue/dist/esm/components/avatar";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {CButton} from "@coreui/vue/dist/esm/components/button";

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

  { title: 'Chambre', align: 'start', key: 'chambre' },
  { title: 'Client', align: 'start', key: 'user' },
  { title: 'Arrivé', align: 'start', key: 'dateArr' },
  { title: 'Départ', align: 'start', key: 'dateDep' },
  { title: 'Nuits', align: 'start', key: 'nuit' },
  { title: 'Statut', align: 'start', key: 'status' },
  { title: 'Actions', align: 'start', key: 'action', sortable: false, },
];
// State to hold reservations data
const reservations = ref([]);

// Function to fetch reservations
async function fetchReservations() {
  const token = localStorage.getItem('token'); // Assumes token is stored in localStorage

  try {
    const response = await fetch('http://127.0.0.1:8000/api/reservation/getReserv', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Use the token for authorization
        'Content-Type': 'application/json'
      }
    });
    reservations.value = await response.json();
    console.log(reservations.value);
  } catch (error) {
    console.error(error.message);
  }
}

// Fetch reservations when component mounts
onMounted(() => {
  fetchReservations();
});
// get all reservation by user connected

const getBadge = (status) => {
  switch (status) {
    case 'Check-in':
      return 'success'
    case 'Check-out':
      return 'primary'
    case 'En attente':
      return 'warning'
    case 'Annulée':
      return 'danger'
    case 'Confirmé':
      return 'info'
    default:
      'primary'
  }
}
const apiUrlPic = 'http://127.0.0.1:8000/storage/';
</script>

<template>
  <div>
    <ReservationStats class="mb-4" />
  </div>
  <div class="w-100 d-flex flex-row-reverse align-items-end">
    <router-link :to="{name: 'Creer Réservations'}" class="btn btn-dark  mx-1">Nouvelle Réservation</router-link>

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
            label="Recherche"
            placeholder="Rechercher Réservation"
            append-inner-icon="mdi-magnify"
            outlined
            clearable
          />
        </div>
      </div>
      <v-data-table
        :items="reservations"
        :headers="headers"
        :items-per-page="itemsPerPage"
        :search="search"
      >
        <template #item.chambre="{ item }">
          <div class="text-dark fw-bold">
            {{ item.chambre.num }}
          </div>
        </template>

        <template #item.user="{ item }">
          <div v-if="item.user_id" class="text-center d-flex flex-row align-items-center justify-content-start">
            <CAvatar size="md" :src="`${apiUrlPic}${item.user.picture}`" />
            <div class="mx-3">{{ item.user.nom }}  {{ item.user.prenom }}</div>
          </div>
          <div v-if="item.user_id == null" class="text-center d-flex flex-row align-items-center justify-content-start">
            <div class="text-muted fw-bold">{{ item.email }} </div>
          </div>
        </template>
        <template #item.dateArr="{ item }">
          <div class="text-dark fw-bold">
            {{ formatDate(item.date_deb) }}
          </div>
        </template>
        <template #item.dateDep="{ item }">
          <div class="text-dark fw-bold">
            {{ formatDate(item.date_fin) }}
          </div>
        </template>

        <template #item.nuit="{ item }">
          <div class="text-dark fw-bold ">
            {{ calculateNights(item.date_deb, item.date_fin) }}
          </div>
        </template>
        <!-- Customize the 'status' column with a badge -->
        <template #item.status="{ item }">
          <CBadge
            :color="getBadge(item.status)"
            style="font-size:14px;"
            >
            {{ item.status }}
          </CBadge>
        </template>
        <template #item.action="{ item }">
          <div v-if="item.status == 'En attente'" >
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
          <div v-if="item.status == 'Check-in'">
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
</template>

<style scoped lang="scss">

</style>
