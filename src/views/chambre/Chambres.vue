<script setup>

import {onMounted, ref} from "vue";
import {CButton} from "@coreui/vue/dist/esm/components/button";
import {CBadge} from "@coreui/vue/dist/esm/components/badge";
import {VCard, VDataTable, VTextField} from "vuetify/components";
import {format} from "date-fns";
import {useToast} from "vue-toastification";
import { fr } from 'date-fns/locale';
const toast = useToast();
// Modal section
const detailsModal = ref(false)
const showRoom = ref(null)
// Original date string
const dateString = '2025-06-24T00:00:00.000000Z';

// Method to format date with French locale
function formatDate(date) {
  return format(new Date(date), 'dd MMMM yyyy à HH:m', { locale: fr });
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
      return 'warning'
    default:
      'primary'
  }
}

// show room type Details
const showType = async (id) =>{
  const token = localStorage.getItem('token');
  const url = `http://127.0.0.1:8000/api/chambre/show/${id}`;
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

//Maintenace roomtype

const typeResult = ref(null)
const maintenanceType = async (id) =>{
  const token = localStorage.getItem('token');
  console.log(id);
  const url = `http://127.0.0.1:8000/api/chambre/maintenance/${id}`;
  console.log("URL générée :", url); // Vérifie l'URL dans la console
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    typeResult.value = await response.json() // Capture response
    if (response.ok) {
      if (!typeResult.value.error.error){
        // Show success toast
        toast.success(typeResult.value.message);
        await fetchChambre();

      }else{
        // Show success toast
        toast.error(typeResult.value.message);
      }
      console.log('Data sent successfully:', typeResult.value)
    } else {
      toast.error(typeResult.value.message);
      console.error('Server error:', typeResult.value)
    }
  } catch (error) {
    console.error('Error sending data:', error)
  }
}


//Available roomtype

const availableResult = ref(null)
const availableType = async (id) =>{
  const token = localStorage.getItem('token');
  console.log(id);
  const url = `http://127.0.0.1:8000/api/chambre/available/${id}`;
  console.log("URL générée :", url); // Vérifie l'URL dans la console
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    availableResult.value = await response.json() // Capture response
    if (response.ok) {
      if (!availableResult.value.error.error){
        // Show success toast
        toast.success(availableResult.value.message);
        await fetchChambre();

      }else{
        // Show success toast
        toast.error(availableResult.value.message);
      }
      console.log('Data sent successfully:', availableResult.value)
    } else {
      toast.error(availableResult.value.message);
      console.error('Server error:', availableResult.value)
    }
  } catch (error) {
    console.error('Error sending data:', error)
  }
}
</script>

<template>
  <div>
    <div class="w-100 d-flex flex-row-reverse align-items-end">
      <router-link :to="{name: 'Chambres.create'}" class="btn btn-dark  mx-1">Ajouter chambre</router-link>
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
        <CModalTitle id="detailModalExample">Chambre</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="mt-4 d-flex flex-column p-3" v-if="showRoom">
          <CCarousel controls indicators transition="crossfade" class="mb-5">
            <CCarouselItem v-for="pic in showRoom.chambre.chambre_image">
              <div class="rounded w-100" style="height: 300px; background-position: center; background-size: cover; " :style="{ backgroundImage: `url(${apiUrlPic}/${pic.image_path})` }"></div>

            </CCarouselItem>
          </CCarousel>
          <div class="d-flex flex-row justify-content-between mb-3">
            <div class="col-6"><span class="fw-bold">Nom: </span> {{ showRoom.chambre.num }}</div>
            <div class="col-6"><span class="fw-bold">Types: </span> {{ showRoom.chambre.types_chambre.name }}</div>
          </div>
          <div class="d-flex flex-row justify-content-between mb-3">
            <div class="col-6"><span class="fw-bold">Capacité: </span> {{ showRoom.chambre.types_chambre.capacity }}</div>
            <div class="col-6"><span class="fw-bold">Description: </span> {{ showRoom.chambre.description }}</div>
          </div>
          <div class="d-flex flex-row justify-content-between mb-3">
            <div class="col-6"><span class="fw-bold">Caractéristique: </span> {{ showRoom.chambre.types_chambre.features  }}</div>
            <div class="col-6"><span class="fw-bold">statut: </span>
              <CBadge
              :color="getBadge(showRoom.chambre.statut)"
              style="font-size:14px;"
              class="mx-2"
            >
              {{ showRoom.chambre.statut }}
            </CBadge> </div>
          </div>
          <div class="d-flex flex-row justify-content-between mb-3">
            <div class="col-6"><span class="fw-bold">Date Création: </span> {{ formatDate(showRoom.chambre.created_at) }}</div>
            <div class="col-6"><span class="fw-bold">Tarif actuel: </span> </div>
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
              placeholder="Chambre"
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
          <template #item.description="{ item}">
            <div>
              {{ item.description.length > 15 ? item.description.substring(0, 15) + "..." : item.description}}
            </div>
          </template>
          <template #item.capacity="{ item }">
            <div class="text-dark fw-bold">
              {{ item.types_chambre.capacity }}
            </div>
          </template>

          <template #item.features="{ item }">
            <div class="text-dark fw-bold">
              {{ item.types_chambre.features.length > 20 ? item.types_chambre.features.substring(0, 20) + "..." : item.types_chambre.features}}
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
                :id="item.id"
                @click="() => {
                  showType(item.id);
                  detailsModal = true;
                } "
              >
                <font-awesome-icon :icon="['fas', 'circle-info']" color="white"/>
              </CButton>
              <CButton
                size="sm"
                color="warning"
                class="mx-1"
                :id="item.id"
                @click="maintenanceType(item.id)"
              >
                <font-awesome-icon :icon="['fas', 'screwdriver-wrench']" color="white"/>
              </CButton>


            </div>
            <div v-if="item.statut == 'Maintenance'">
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
                :id="item.id"
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
                class="mx-1"
                :id="item.id"
                @click="availableType(item.id)"
              >
                <font-awesome-icon :icon="['fas', 'check']" color="white"/>
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
