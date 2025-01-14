<script setup>

import {CForm, CFormSelect} from "@coreui/vue/dist/esm/components/form";
import {CCard} from "@coreui/vue/dist/esm/components/card";
</script>

<template>
  <div class="d-flex flex-row align-items-center justify-content-center">
    <CCard class="col-8">
      <CCardHeader >Nouveau client</CCardHeader>
      <CCardbody>
        <CForm class="px-4 py-4">
          <div class="row">
            <div class="col-6">
              <CFormLabel for="nmbCh">Nom</CFormLabel>
              <CFormInput type="text" id="name" placeholder=""/>
            </div>
            <div class="col-6">
                <CFormLabel for="nmbCh">Prenom</CFormLabel>
                <CFormInput type="text" id="firstname" placeholder=""/>
              </div>
          </div>
          <div class="row mb-3">
            <div class="col-6">
              <CFormLabel for="nmbCh">Tel</CFormLabel>
              <CFormInput type="text" id="name" placeholder="+000 00-00-00-00"/>
            </div>
            <div class="col-6">
                <CFormLabel for="nmbCh">Email</CFormLabel>
                <CFormInput type="mail" id="mail" placeholder="example@co.te"/>
              </div>
          </div>
          <div class="row mb-3">
            <div class="col-6">
              <CFormLabel for="nmbCh">Adresse</CFormLabel>
              <CFormInput type="text" id="adress" placeholder=""/>
            </div>
            <div class="col-6">
                <CFormLabel for="nmbCh">Date de naissance</CFormLabel>
                <CFormInput type="mail" id="mail" placeholder="example@co.te"/>
              </div>
          </div>
          <div class="d-f mb-3 d-flex flex-row-reverse w-full mt-4">
            <CButton color="primary" type="submit" >Ajouter</CButton>
          </div>
        </CForm>
      </CCardbody>
    </CCard>
  </div>
</template>

<style scoped lang="scss">

</style>
