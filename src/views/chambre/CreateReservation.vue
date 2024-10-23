<script setup>

import {CForm, CFormSelect} from "@coreui/vue/dist/esm/components/form";
import {CCard} from "@coreui/vue/dist/esm/components/card";
import { ref } from 'vue';
import { startOfDay, isBefore,addDays } from 'date-fns';
const  room = {
  type:'',
  tarif:'',
  mat:'',
  client:'',
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
const isDateDepDisabled = (date) => {
  return isBefore(date, dayoff); // Désactive les dates avant aujourd'hui
};
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

</script>

<template>

  <div class="d-flex flex-row align-items-center justify-content-center">
    <CCard class="col-7">
      <CCardHeader >Nouvelle réservation</CCardHeader>
      <CCardbody>
        <CForm class="px-4 py-4">
          <div class="row">
            <div class="col-6">
              <CFormLabel for="nmbCh">Client</CFormLabel>
              <CFormSelect aria-label="Default select ">
                <option>Selectionner</option>
                <option
                  v-for="option in clients"
                  :value="option"
                  :key="option"
                  :selected="option === room.client"
                >{{ option }}</option>
              </CFormSelect>
            </div>
            <div class="col-6">
              <CFormLabel for="tarif_lab">Chambre Disponible</CFormLabel>
              <CFormSelect aria-label="Default select ">
                <option>Selectionner</option>
                <option
                  v-for="option in roomNumbers"
                  :value="option"
                  :key="option"
                  :selected="option === room.type"
                >{{ option }}</option>
              </CFormSelect>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="tarif_lab">Date d'arrivée</CFormLabel>
              <VueDatePicker
                v-model="dateArr"
                :range="{ noDisabledRange: true }"
                :disabled-dates="isDateDisabled"
              />
            </div>
            <div class="col-6">
              <CFormLabel for="tarif_lab">Date de départ</CFormLabel>
              <VueDatePicker
                v-model="dateDep"
                :range="{ noDisabledRange: true }"
                :disabled-dates="isDateDepDisabled"
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
