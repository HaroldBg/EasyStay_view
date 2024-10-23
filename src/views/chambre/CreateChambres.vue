<script setup>

import {CCard} from "@coreui/vue/dist/esm/components/card";
import BasicInput from "../../components/BasicInput.vue";
import {CFormSelect} from "@coreui/vue/dist/esm/components/form";

const  room = {
  type:'',
  tarif:'',
  mat:'',
}
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
</script>

<template>
  <div class="d-flex flex-row align-items-center justify-content-center">
    <CCard class="col-6">
      <CCardHeader>Ajouter chambre</CCardHeader>
      <CCardbody>
        <CForm class="px-4 py-4">
          <div class="mb-3 ">
            <CFormLabel for="nmbCh">Numéro de chambre</CFormLabel>
            <CFormInput type="text" id="nmbCh" placeholder="Numéro de chambre"/>
          </div>
          <div class="mb-3">
            <CFormLabel for="tarif_lab">Tarif</CFormLabel>
            <CFormInput type="text" id="tarif_lab" placeholder="Tarif par nuit"/>
          </div>
          <div class="mb-3">
            <CFormLabel for="Type">Type de chambre</CFormLabel>
            <CFormSelect aria-label="Default select ">
              <option>Selectionner</option>
              <option
                v-for="option in types"
                :value="option"
                :key="option"
                :selected="option === room.type"
              >{{ option }}</option>
            </CFormSelect>
          </div>
          <div class="d-flex flex-row-reverse w-full">
            <CButton color="primary" type="submit" >Ajouter</CButton>
          </div>
        </CForm>
      </CCardbody>
    </CCard>
  </div>
</template>

<style scoped lang="scss">

</style>
