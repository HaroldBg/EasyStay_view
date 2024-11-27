<script setup>

import {CForm, CFormSelect} from "@coreui/vue/dist/esm/components/form";
import {CCard} from "@coreui/vue/dist/esm/components/card";
import {onMounted, ref, watch} from 'vue';
import { startOfDay, isBefore,addDays } from 'date-fns';
import { useToast } from 'vue-toastification';
import {useRouter} from "vue-router";
// Access router instance
const router = useRouter();

const toast = useToast();
const  room = {
  type:'',
  tarif:'',
  mat:'',
  client:'',
}
const formData = ref({
  email: '',
  chambre_id: '',
  date_deb:'',
  date_fin:'',
  nmb_per:'',
  user_id:'',
});

const reservResult = ref(null)
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
const types = [
  'Chambre Simple',
  'Chambre double',
  'Chambre triple',
  'Suite junior',
  'Suite Senior',
  'Suite Maitre',
  'Duplex',
  'Penthouse'
]
const clients = [
  'John Doe',
  'Jane Smith',
  'Michael Johnson',
  'Emily Davis',
  'David Brown',
  'Sophia Wilson',
  'James Garcia',
  'Olivia Martinez',
  'Daniel Taylor',
  'Isabella Anderson',
  'Matthew Thomas',
  'Charlotte White',
  'Andrew Harris',
  'Emma Lee',
  'Benjamin Walker'
];
const roomNumbers = [
  'CH-101',
  'CH-102',
  'CH-103',
  'CH-104',
  'CH-105',
  'CH-201',
  'CH-202',
  'CH-203',
  'CH-204',
  'CH-205',
  'CH-301',
  'CH-302',
  'CH-303',
  'CH-304',
  'CH-305'
];
// let fetch Room

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
const sendData = async () => {

  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://127.0.0.1:8000/api/reservation/storeReserv', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    })
    reservResult.value = await response.json() // Capture response
    if (response.ok) {
      if (!reservResult.value.error.error){
        // Show success toast
        toast.success(reservResult.value.message);
        resetForm();
        await router.push({name : 'Réservations'});
      }else{
        // Show success toast
        toast.error(reservResult.value.message);
      }
      console.log('Data sent successfully:', reservResult.value)
    } else {
      toast.error(reservResult.value.message);
      console.error('Server error:', reservResult.value)
    }
  } catch (error) {
    console.error('Error sending data:', error)
  }
}
function resetForm() {
  formData.value = {
    email: '',
    chambre_id: '',
    date_deb:'',
    date_fin:'',
    nmb_per:'',
    user_id:'',
  }; // Reset each field to its initial value
}
onMounted(() => {
  fetchChambre();
});
</script>

<template>
  <div class="d-flex flex-row align-items-center justify-content-center">
    <CCard class="col-7">
      <CCardHeader >Nouvelle réservation</CCardHeader>
      <CCardbody>
        <CForm @submit.prevent="sendData" class="px-4 py-4">
          <div class="row">
            <div class="col-6">
              <CFormLabel for="nmbCh">Client</CFormLabel>
              <CFormInput
                placeholder="Mail"
                required
                v-model="formData.email"
              />
            </div>
            <div class="col-6">
              <CFormLabel for="tarif_lab">Chambre Disponible</CFormLabel>
              <CFormSelect aria-label="Default select " required v-model="formData.chambre_id">
                <option>Selectionner</option>
                <option
                  v-for="option in rooms.chambres"
                  :value="option.id"
                  :key="option.num"
                  :selected="option === room.type"
                >{{ option.num }}</option>
              </CFormSelect>
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
              <CFormLabel for="tarif_lab">Voyageur(s)</CFormLabel>
              <CFormInput
                type="number"
                min="1"
                required
                v-model="formData.nmb_per"
              />
            </div>
          </div>
          <div class="d-flex flex-row-reverse w-full mt-4">
            <CButton color="primary" type="submit" >Ajouter</CButton>
          </div>
        </CForm>
      </CCardbody>
    </CCard>
  </div>
</template>

<style scoped lang="scss">

</style>
