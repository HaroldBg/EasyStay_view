<script setup>

import ChambreStats from "../widgets/ChambreStats.vue";

import {onMounted, ref, watch} from "vue";
import {CButton} from "@coreui/vue/dist/esm/components/button";
import {CBadge} from "@coreui/vue/dist/esm/components/badge";
import {VCard, VDataTable, VTextField} from "vuetify/components";
import {addDays, format, isBefore, startOfDay} from "date-fns";
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
  return format(new Date(date), 'dd MMMM', { locale: fr });
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

  { title: 'Saison', align: 'start', key: 'saison' },
  { title: 'Type de chambre ', align: 'start', key: 'type_chambre' },
  { title: 'Date début ', align: 'start', key: 'date_deb' },
  { title: 'Date Fin ', align: 'start', key: 'date_fin' },
  { title: 'Prix ', align: 'start', key: 'prix' },
  { title: 'Statut', align: 'start', key: 'status' },
  { title: 'Actions', align: 'start', key: 'action', sortable: false, },
];
// State to hold reservations data
const roomstype = ref([]);
const tarificationfetch = ref([]);
async function fetchTarification() {
  const token = localStorage.getItem('token'); // Assumes token is stored in localStorage

  try {
    const response = await fetch('http://127.0.0.1:8000/api/chambre/tarification/showAllTarif', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Use the token for authorization
        'Content-Type': 'application/json'
      }
    });
    tarificationfetch.value = await response.json();
    console.log(tarificationfetch.value);
  } catch (error) {
    console.error(error.message);
  }
}

//fetch roomtype
async function fetchTypeChambre() {
  const token = localStorage.getItem('token'); // Assumes token is stored in localStorage

  try {
    const response = await fetch('http://127.0.0.1:8000/api/chambre/type/show', {
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
  saison: '',
  prix: '',
  types_chambres_id:'',
  date_deb:'',
  date_fin:'',
});
const editData = ref({
  saison: '',
  prix: '',
  types_chambres_id:'',
  date_deb:'',
  date_fin:'',
});
const sendData = async () => {

  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://127.0.0.1:8000/api/chambre/tarification/store', {
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
        await fetchTarification();

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
// update data

const updateResult = ref(null)
const updateData = async () => {

  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://127.0.0.1:8000/api/chambre/tarification/store', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    })
    updateResult.value = await response.json() // Capture response
    if (response.ok) {
      if (!updateResult.value.error.error){
        // Show success toast
        toast.success(updateResult.value.message);
        resetForm();
        visibleVerticallyCenteredDemo.value = false;
        await fetchTarification();

      }else{
        // Show success toast
        toast.error(updateResult.value.message);
      }
      console.log('Data sent successfully:', updateResult.value)
    } else {
      toast.error(updateResult.value.message);
      console.error('Server error:', updateResult.value)
    }
  } catch (error) {
    console.error('Error sending data:', error)
  }
}
// reset form
function resetForm() {
  formData.value = {
    saison: '',
    prix: '',
    types_chambres_id:'',
    date_deb:'',
    date_fin:'',
  }; // Reset each field to its initial value
}
// show room type Details
const showType = async (id) =>{
  const token = localStorage.getItem('token');
  const url = `http://127.0.0.1:8000/api/chambre/tarification/show/${id}`;
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
// show room type Details for edit
const showTypeRoomEdit = ref(null);

const showTypeEdit = async (id) =>{
  const token = localStorage.getItem('token');
  const url = `http://127.0.0.1:8000/api/chambre/tarification/showEdit/${id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    showTypeRoomEdit.value = await response.json() // Capture response
    if (!response.ok) {
      toast.error(showTypeRoomEdit.value.message);
      console.error('Server error:', showTypeRoomEdit.value)
    }
    // let assign value to editData
    editData.value.id = showTypeRoomEdit.value.id;
    editData.value.saison = showTypeRoomEdit.value.saison;
    editData.value.prix = showTypeRoomEdit.value.prix;
    editData.value.types_chambres_id = showTypeRoomEdit.value.types_chambres_id;
    editData.value.date_deb = showTypeRoomEdit.value.date_start;
    editData.value.date_fin = showTypeRoomEdit.value.date_end;
    console.log(editData)
  } catch (error) {
    console.error('Error sending data:', error)
  }
}
//delete roomtype
const deleteType = async (id) =>{
  const token = localStorage.getItem('token');
  console.log(id);
  const url = `http://127.0.0.1:8000/api/chambre/tarification/delete/${id}`;
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
  fetchTarification();
  fetchTypeChambre();
});
// get all reservation by user connected

const apiUrlPic = 'http://127.0.0.1:8000/storage/';
// get status
const getBadge = (status) => {
  switch (status) {
    case 'Disponible':
      return 'success'
    case 'Occupé':
      return 'warning'
    case 'Maintenance':
      return 'danger'
    default:
      'primary'
  }
}
const dateArr = ref();
// Référence pour la date sélectionnée
const selectedDate = ref(null);

// Récupère la date d'aujourd'hui à minuit
const today = startOfDay(new Date());

// Fonction pour désactiver toutes les dates avant aujourd'hui
const isDateDisabled = (date) => {
  return isBefore(date, today); // Désactive les dates avant aujourd'hui
};

const dateDep = ref();
const dayoff = addDays(today,1);
// Fonction pour désactiver les dates avant date_deb pour date_fin (date de départ)
const isDateDepDisabled = (date) => {
  // If date_deb is set, disable all dates before it for date_fin
  return formData.value.date_deb ? isBefore(date, addDays(new Date(formData.value.date_deb), 0)) : isBefore(date, today);
};

// Watch formData.date_deb and reset formData.date_fin if it becomes invalid
watch(
  () => formData.value.date_deb,
  (newDate) => {
    if (formData.value.date_fin && isBefore(new Date(formData.value.date_fin), addDays(new Date(newDate), 1))) {
      formData.value.date_fin = ''; // Reset date_fin if it's before the valid range
    }
  }
);

const editTarification = (id) => {

  showTypeEdit(id);
  editModal.value = true; // Ouvre le modal
};

</script>

<template>
  <div>
    <div class="w-100 d-flex flex-row-reverse align-items-end">
      <CButton @click="() => { visibleVerticallyCenteredDemo = true }" class="btn btn-outline-dark mx-1">Ajouter Tarification</CButton>
    </div>

    <CModal
      alignment="center"
      :visible="visibleVerticallyCenteredDemo"
      @close="() => { visibleVerticallyCenteredDemo = false }"
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample">Nouvelle tarification</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm @submit.prevent="sendData" class="px-4 py-4">
          <div class="row">
            <div class="col-6">
              <CFormLabel for="nmbCh">Saison</CFormLabel>
              <CFormInput
                placeholder=""
                required
                v-model="formData.saison"
              />
            </div>
            <div class="col-6">
              <CFormLabel for="nmbCh">Prix</CFormLabel>
              <CFormInput
                placeholder=""
                required
                v-model="formData.prix"
                type="number"
                min="1"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="tarif_lab">Date d'arrivée</CFormLabel>
              <VueDatePicker
                v-model="formData.date_deb"
                :disabled-dates="isDateDisabled"
                :enable-time-picker="false"
                required
              />
            </div>
            <div class="col-6">
              <CFormLabel for="tarif_lab">Date de départ</CFormLabel>
              <VueDatePicker
                v-model="formData.date_fin"
                :disabled-dates="isDateDepDisabled"
                :enable-time-picker="false"
                required

              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="tarif_lab">Type de chambre</CFormLabel>
              <CFormSelect aria-label="Default select " required v-model="formData.types_chambres_id">
                <option>Selectionner</option>
                <option
                  v-for="option in roomstype.typeChambre"
                  :value="option.id"
                  :key="option.name"
                >{{ option.name }}</option>
              </CFormSelect>
            </div>
          </div>
          <CModalFooter class="mt-5">
            <CButton color="primary" type="submit">Ajouter</CButton>
            <CButton color="secondary" @click="() => { visibleVerticallyCenteredDemo = false }">
              Fermer
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>

    </CModal>

    <CModal
      alignment="center"
      :visible="editModal"
      @close="() => { editModal = false }"
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample">Modifier tarification</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm @submit.prevent="updateData" class="px-4 py-4">
          <div class="row">
            <div class="col-6">
              <CFormLabel for="nmbCh">Saison</CFormLabel>
              <CFormInput
                placeholder=""
                required
                v-model="editData.saison"
              />
            </div>
            <div class="col-6">
              <CFormLabel for="nmbCh">Prix</CFormLabel>
              <CFormInput
                placeholder=""
                required
                v-model="editData.prix"
                type="number"
                min="1"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="tarif_lab">Date d'arrivée</CFormLabel>
              <VueDatePicker
                v-model="editData.date_deb"
                :disabled-dates="isDateDisabled"
                :enable-time-picker="false"
                required
              />
            </div>
            <div class="col-6">
              <CFormLabel for="tarif_lab">Date de départ</CFormLabel>
              <VueDatePicker
                v-model="editData.date_fin"
                :disabled-dates="isDateDepDisabled"
                :enable-time-picker="false"
                required

              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="tarif_lab">Type de chambre</CFormLabel>
              <CFormSelect v-if="roomstype.typeChambre.length > 0 && editData.types_chambres_id !== null" aria-label="Sélectionnez un type de chambre" required v-model="editData.types_chambres_id">
                <option value="">Selectionner</option>
                <option
                  v-for="option in roomstype.typeChambre"
                  :value="option.id"
                  :key="option.id"
                >{{ option.name }}</option>
              </CFormSelect>
            </div>
          </div>
          <CModalFooter class="mt-5">
            <CButton color="primary" type="submit">Modifier</CButton>
            <CButton color="secondary" @click="() => { editModal = false }">
              Annuler
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
        <CModalTitle id="detailModalExample">Tarification</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="mt-4 d-flex flex-column p-3" v-if="showTypeRoom">
          <p><span class="fw-bold">Saison: </span> {{ showTypeRoom.tarifications.saison }}</p>
          <p><span class="fw-bold">Type de chambre: </span> {{ showTypeRoom.tarifications.type_chambre }}</p>
          <p><span class="fw-bold">Période: </span> {{ showTypeRoom.tarifications.date_deb }} - {{ showTypeRoom.tarifications.date_fin }}</p>
          <p><span class="fw-bold">Prix: </span> {{ showTypeRoom.tarifications.prix }}</p>
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
              placeholder="Tarification"
              append-inner-icon="mdi-magnify"
              outlined
              clearable
            />
          </div>
        </div>
        <v-data-table
          :items="tarificationfetch.tarifications"
          :headers="headers"
          :items-per-page="itemsPerPage"
          :search="search"
        >
          <template #item.saison="{ item }">
            <div class="text-dark fw-bold">
              {{ item.saison }}
            </div>
          </template>
          <template #item.type_chambre="{ item }">
            <div class="text-dark fw-bold">
              {{ item.type_chambre }}
            </div>
          </template>

          <template #item.prix="{ item }">
            <div class="text-dark fw-bold">
              {{ item.prix}}
            </div>
          </template>
          <template #item.date_deb="{ item }">
            <div class="text-dark fw-bold">
              {{ item.date_deb}}
            </div>
          </template>
          <template #item.date_fin="{ item }">
            <div class="text-dark fw-bold">
              {{ item.date_fin}}
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
            <div v-if="item.status == 'Disponible'" >
              <CButton
                size="sm"
                color="secondary"
                class="mx-1"
                @click="() => {
                  editTarification(item.id)
                } "
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
                <font-awesome-icon :icon="['fas', 'trash-can']" />
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
