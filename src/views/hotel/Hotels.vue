<script setup>

import getAllHotels from "../../services/getAllHotels";
import {onMounted, ref} from "vue";
import {VDataTable} from "vuetify/components";
import {VTextField} from "vuetify/components";
import {VCard} from "vuetify/components";
import {CBadge} from "@coreui/vue/dist/esm/components/badge";

// Call the function and destructure the return values
const { hotels, error, load } = getAllHotels();

// Load the posts when the component is mounted
onMounted(() => {
  load();
});

// Define local properties
const itemsPerPage = 10;
const search = ref('');
const headers = [
  {
    title: 'Id',
    align: 'start',
    sortable: false,
    key: 'id',
  },
  { title: 'Nom', align: 'start', key: 'nom' },
  { title: 'Adresse', align: 'start', key: 'adresse' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Statut', align: 'start', key: 'status' },
];
const data = hotels
</script>

<template>
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
      :items="data"
      :headers="headers"
      :items-per-page="itemsPerPage"
      :search="search"
    >
      <!-- Customize the 'status' column with a badge -->
      <template #item.status="{ item }">
        <CBadge
          color="primary"
          v-if="item.status === 'Configuration Pending'">
          {{ item.status }}
        </CBadge>
      </template>
    </v-data-table>
  </v-card>

</template>

<style scoped lang="scss">

</style>
