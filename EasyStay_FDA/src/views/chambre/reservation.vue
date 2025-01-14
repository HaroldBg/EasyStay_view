<script setup>

import ReservationStats from "../widgets/ReservationStats.vue";
import {CBadge} from "@coreui/vue/dist/esm/components/badge";
import {VCard, VDataTable, VTextField} from "vuetify/components";
import {onMounted, ref} from "vue";
import {CAvatar} from "@coreui/vue/dist/esm/components/avatar";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {CButton} from "@coreui/vue/dist/esm/components/button";
import {useToast} from "vue-toastification";
const toast = useToast();

// Original date string
const dateString = '2025-06-24T00:00:00.000000Z';

const showRoom = ref(null)
const detailsModal = ref(false)
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


// show room type Details
const showType = async (id) =>{
  const token = localStorage.getItem('token');
  const url = `http://127.0.0.1:8000/api/reservation/show/${id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    showRoom.value = await response.json() // Capture response
    if (!response.ok) {
      toast.error(showRoom.value.message);
      console.error('Server error:', showRoom.value)
    }
  } catch (error) {
    console.error('Error sending data:', error)
  }
}
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

const checkInResult = ref(null)
const checkIn = async (id) =>{
  const token = localStorage.getItem('token');
  console.log(id);
  const url = `http://127.0.0.1:8000/api/reservation/checkin/${id}`;
  console.log("URL générée :", url); // Vérifie l'URL dans la console
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    checkInResult.value = await response.json() // Capture response
    if (response.ok) {
      if (!checkInResult.value.error.error){
        // Show success toast
        toast.success(checkInResult.value.message);
        await fetchReservations();

      }else{
        // Show success toast
        toast.error(checkInResult.value.message);
      }
      console.log('Data sent successfully:', checkInResult.value)
    } else {
      toast.error(checkInResult.value.message);
      console.error('Server error:', checkInResult.value)
    }
  } catch (error) {
    console.error('Error sending data:', error)
  }
}

const checkOutResult = ref(null)
const checkOut = async (id) =>{
  const token = localStorage.getItem('token');
  console.log(id);
  const url = `http://127.0.0.1:8000/api/reservation/checkout/${id}`;
  console.log("URL générée :", url); // Vérifie l'URL dans la console
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    checkOutResult.value = await response.json() // Capture response
    if (response.ok) {
      if (!checkOutResult.value.error.error){
        // Show success toast
        toast.success(checkOutResult.value.message);
        await fetchReservations();

      }else{
        // Show success toast
        toast.error(checkOutResult.value.message);
      }
      console.log('Data sent successfully:', checkOutResult.value)
    } else {
      toast.error(checkOutResult.value.message);
      console.error('Server error:', checkOutResult.value)
    }
  } catch (error) {
    console.error('Error sending data:', error)
  }
}
</script>

<template>
  <div class="w-100 d-flex flex-row-reverse align-items-end">
    <router-link :to="{name: 'New Booking'}" class="btn btn-dark  mx-1">Nouvelle Réservation</router-link>

  </div>

  <CModal
    size="lg"
    scrollable
    alignment="center"
    :visible="detailsModal"
    @close="() => { detailsModal = false }"
    aria-labelledby="detailModalExample"
  >
    <CModalHeader>
      <CModalTitle id="detailModalExample">Réservation</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="mt-4 d-flex flex-column p-3" v-if="showRoom">

        <div class="d-flex flex-row justify-content-between mb-3">
          <div class="col-6"><span class="fw-bold">Chambre: </span> {{ showRoom.reservation.chambre }}</div>
          <div class="col-6"><span class="fw-bold">Client: </span> {{ showRoom.reservation.client }}</div>
        </div>
        <div class="d-flex flex-row justify-content-between mb-3">
          <div class="col-6"><span class="fw-bold">Arrivé: </span> {{ formatDate(showRoom.reservation.date_deb) }}</div>
          <div class="col-6"><span class="fw-bold">Départ: </span> {{ formatDate(showRoom.reservation.date_fin) }}</div>
        </div>
        <div class="d-flex flex-row justify-content-between mb-3">
          <div class="col-6"><span class="fw-bold">Type chambre: </span> {{ showRoom.reservation.type_chambre  }}</div>
          <div class="col-6"><span class="fw-bold">statut: </span>
            <CBadge
              :color="getBadge(showRoom.reservation.status)"
              style="font-size:14px;"
              class="mx-2"
            >
              {{ showRoom.reservation.status }}
            </CBadge> </div>
        </div>
        <div class="d-flex flex-row justify-content-between mb-3">
          <div class="col-6"><span class="fw-bold">Voyageur(s): </span> {{ showRoom.reservation.nmb_per }}</div>
          <div class="col-6"><span class="fw-bold">Capacité chambre: </span> {{ showRoom.reservation.capacity }}</div>
        </div>




      </div>
    </CModalBody>
    <CModalFooter class="mt-5">
      <CButton color="secondary" @click="() => { detailsModal = false }">
        Fermer
      </CButton>
    </CModalFooter>
  </CModal>
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
            @click="() => {
                  showType(item.id);
                  detailsModal = true;
                } "
            >
              <font-awesome-icon :icon="['fas', 'circle-info']" color="white"/>
            </CButton>
            <CButton
            size="sm"
            color="success"
            class="mx-2"
            :id="item.id"
            @click="() => checkIn(item.id)"
            >
              <font-awesome-icon :icon="['fas', 'right-to-bracket']" color="white" />
            </CButton>

          </div>
          <div v-if="item.status == 'Check-in'">
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
              @click="() => {
                  showType(item.id);
                  detailsModal = true;
                } "
            >
              <font-awesome-icon :icon="['fas', 'circle-info']" color="white"/>
            </CButton>
            <CButton
              size="sm"
              color="danger"
              class="mx-2"
              :id="item.id"
              @click="() => checkOut(item.id)"
            >
              <font-awesome-icon :icon="['fas', 'right-from-bracket']" color="white"/>
            </CButton>
          </div>
          <div v-if="item.status == 'Check-out'">

            <CButton
              size="sm"
              color="primary"
              class="mx-2"
              @click="() => {
                  showType(item.id);
                  detailsModal = true;
                } "
            >
              <font-awesome-icon :icon="['fas', 'circle-info']" color="white"/>
            </CButton>
            <CButton
              size="sm"
              color="dark"
            >
              <font-awesome-icon :icon="['fas', 'file']" color="white"/>
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
              @click="() => {
                  showType(item.id);
                  detailsModal = true;
                } "
            >
              <font-awesome-icon :icon="['fas', 'circle-info']" color="white"/>
            </CButton>
            <CButton
              size="sm"
              color="success"
              class="mx-2"
              :id="item.id"
              @click="() => checkIn(item.id)"
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
