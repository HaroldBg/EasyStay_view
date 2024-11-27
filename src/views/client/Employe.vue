<script setup>

import ChambreStats from "../widgets/ChambreStats.vue";

import {onMounted, ref} from "vue";
import {CButton} from "@coreui/vue/dist/esm/components/button";
import {CBadge} from "@coreui/vue/dist/esm/components/badge";
import {VCard, VDataTable, VTextField} from "vuetify/components";
import {format} from "date-fns";
import { useToast } from 'vue-toastification';
import {useRouter} from "vue-router";
import {CForm, CFormSelect, CFormTextarea} from "@coreui/vue/dist/esm/components/form";
import {fr} from "date-fns/locale";


// Modal section
const visibleVerticallyCenteredDemo = ref(false)
const detailsModal = ref(false)
const editModal = ref(false)
// access router instance and toast
const router = useRouter();

const toast = useToast();
const typeResult = ref(null)
const showTypeRoom = ref(null)

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
//define table headers
const headers = [

  { title: 'Nom', align: 'start', key: 'nom' },
  { title: 'Prenom ', align: 'start', key: 'prenom' },
  { title: 'Email ', align: 'start', key: 'email' },
  { title: 'Statut', align: 'start', key: 'status' },
  { title: 'Actions', align: 'start', key: 'action', sortable: false, },
];
// State to hold reservations data
const roomstype = ref([]);
async function fetchTypeChambre() {
  const token = localStorage.getItem('token'); // Assumes token is stored in localStorage

  try {
    const response = await fetch('http://127.0.0.1:8000/api/employee', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Use the token for authorization
        'Content-Type': 'application/json'
      }
    });
    roomstype.value = await response.json();
    console.log(roomstype.value);
  } catch (error) {
    console.error(error.message);
  }
}
const formData = ref({
  name: '',
  capacity: '',
  features:'',
});
const sendData = async () => {

  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://127.0.0.1:8000/api/chambre/type/store', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    })
    typeResult.value = await response.json() // Capture response
    if (response.ok) {
      if (!typeResult.value.error.error){
        // Show success toast
        toast.success(typeResult.value.message);
        resetForm();
        visibleVerticallyCenteredDemo.value = false;
        await fetchTypeChambre();

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
// reset form
function resetForm() {
  formData.value = {
    name: '',
    capacity: '',
    features:'',
  }; // Reset each field to its initial value
}
// show room type Details
const showType = async (id) =>{
  const token = localStorage.getItem('token');
  const url = `http://127.0.0.1:8000/api/employee/show/${id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    showTypeRoom.value = await response.json() // Capture response
    if (!response.ok) {
      toast.error(showTypeRoom.value.message);
      console.error('Server error:', showTypeRoom.value)
    }
  } catch (error) {
    console.error('Error sending data:', error)
  }
}
//delete roomtype
const deleteType = async (id) =>{
  const token = localStorage.getItem('token');
  console.log(id);
  const url = `http://127.0.0.1:8000/api/employee/status/${id}`;
  console.log("URL générée :", url); // Vérifie l'URL dans la console
  try {
    const response = await fetch(url, {
      method: 'DELETE',
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
        resetForm();
        await fetchTypeChambre();

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
// Fetch reservations when component mounts
onMounted(() => {
  fetchTypeChambre();
});
// get all reservation by user connected

const apiUrlPic = 'http://127.0.0.1:8000/storage/';
// get status
const getBadge = (status) => {
  switch (status) {
    case 'Enable':
      return 'success'
    case 'Email Confirmation Pending':
      return 'primary'
    case 'Account Confirmation Pending':
      return 'warning'
    case 'Disable':
      return 'danger'
    default:
      'primary'
  }
}


</script>

<template>
  <div>
    <div class="w-100 d-flex flex-row-reverse align-items-end">
      <CButton @click="() => { visibleVerticallyCenteredDemo = true }" class="btn btn-outline-dark mx-1">Créer Réceptionniste</CButton>
    </div>

    <CModal
      alignment="center"
      :visible="visibleVerticallyCenteredDemo"
      @close="() => { visibleVerticallyCenteredDemo = false }"
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample">Création réceptioniste</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm @submit.prevent="sendData" class="px-4 py-4">
          <div class="row">
            <div class="col-6">
              <CFormLabel for="nmbCh">Nom</CFormLabel>
              <CFormInput
                placeholder=""
                required
                v-model="formData.name"
              />
            </div>
            <div class="col-6">
              <CFormLabel for="nmbCh">Capacité</CFormLabel>
              <CFormInput
                placeholder=""
                required
                v-model="formData.capacity"
                type="number"
                min="1"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <CFormTextarea
                id="exampleFormControlTextarea1"
                label="Caractéristiques"
                rows="3"
                required
                v-model="formData.features"
              ></CFormTextarea>
            </div>
          </div>
          <CModalFooter class="mt-5">
            <CButton color="primary" type="submit">Ajouter</CButton>
            <CButton color="secondary" @click="() => { visibleVerticallyCenteredDemo = false }">
              Close
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>

    </CModal>

    <CModal
      alignment="center"
      :visible="detailsModal"
      @close="() => { detailsModal = false }"
      aria-labelledby="detailModalExample"
    >
      <CModalHeader>
        <CModalTitle id="detailModalExample">Détails Client</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="mt-4 d-flex flex-column p-3" v-if="showTypeRoom">
          <div class="clearfix">
            <CImage align="center" style=" background-position: center; background-size: cover; " rounded :style="{ backgroundImage: `url(${apiUrlPic}/${showTypeRoom.client.picture})` }" width="200" height="200"/>
          </div>
          <p class="mt-3"><span class="fw-bold">Nom: </span> {{ showTypeRoom.client.nom }}</p>
          <p><span class="fw-bold">Prenom: </span> {{ showTypeRoom.client.prenom }}</p>
          <p><span class="fw-bold">E-mail: </span> {{ showTypeRoom.client.email }}</p>
          <p><span class="fw-bold">Adresse: </span> {{ showTypeRoom.client.adresse }}</p>
          <p><span class="fw-bold">Tél: </span> {{ showTypeRoom.client.tel }}</p>
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
              :loading="loading"
              label="Recherche"
              placeholder="Type de chambre"
              append-inner-icon="mdi-magnify"
              outlined
              clearable
            />
          </div>
        </div>
        <v-data-table
          :items="roomstype.client"
          :headers="headers"
          :items-per-page="itemsPerPage"
          :search="search"
        >
          <template #item.nom="{ item }">
            <div class="text-dark fw-bold">
              {{ item.nom }}
            </div>
          </template>
          <template #item.prenom="{ item }">
            <div class="text-dark fw-bold">
              {{ item.prenom }}
            </div>
          </template>

          <template #item.email="{ item }">
            <div class="text-dark fw-bold">
              {{  item.email }}
            </div>
          </template>
          <template #item.status="{ item }">
            <CBadge
              :color="getBadge(item.status)"
              style="font-size:14px;"
            >
              {{ item.status }}
            </CBadge>
          </template>
          <template #item.action="{ item }">
            <div v-if="item.status == 'Email Confirmation Pending'" >
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
                color="danger"
                class="mx-1 text-white"
                :id="item.id"
                @click="() => deleteType(item.id)"
              >
                <font-awesome-icon :icon="['fas', 'rotate']" />
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
