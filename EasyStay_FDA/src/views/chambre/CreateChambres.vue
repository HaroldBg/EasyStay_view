<script setup>

import {CCard} from "@coreui/vue/dist/esm/components/card";
import {CFormSelect} from "@coreui/vue/dist/esm/components/form";
// Import FilePond and plugins
import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';

// Import styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";

const router = useRouter();

const toast = useToast();
// Register the plugins with FilePond
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview, FilePondPluginImageEdit);

// Create the reactive data properties
const myFiles = ref([]);
// Set up a ref for the FilePond instance
const pondRef = ref(null);
// Define methods
const handleFilePondInit = () => {
  console.log('FilePond has initialized');
  // Example of calling an instance method on the FilePond ref
  pondRef.value?.getFiles();
};

const formData = ref({
  num:'',
  description:'',
  images:[],
  types_chambres_id:'',
});
const updateFiles = (fileItems) => {
  formData.value.images = fileItems.map(fileItem => fileItem.file); // Store raw files
};
const  room = {
  type:'',
  tarif:'',
  mat:'',
}
const types = ref([]);
async function fetchTypes() {
  const token = localStorage.getItem('token'); // Assumes token is stored in localStorage

  try {
    const response = await fetch('http://127.0.0.1:8000/api/chambre/type/show', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Use the token for authorization
        'Content-Type': 'application/json'
      }
    });
    types.value = await response.json();
    console.log(types.value);
  } catch (error) {
    console.error(error.message);
  }
}

const typeResult = ref(null)
const sendData = async () => {
  const data = new FormData();

  // Append other form data
  data.append('num', formData.value.num);
  data.append('description', formData.value.description);
  data.append('types_chambres_id', formData.value.types_chambres_id);

  // Append each file in images array
  formData.value.images.forEach((file, index) => {
    data.append(`images[${index}]`, file); // Use .file to get the raw file object
  });
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://127.0.0.1:8000/api/chambre/store', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: data,
    })
    typeResult.value = await response.json() // Capture response
    console.log(typeResult.value)
    if (response.ok) {
      if (!typeResult.value.error.error){
        // Show success toast
        toast.success(typeResult.value.message);
        resetForm();
        await router.push({name : 'Chambres'});

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
function resetForm() {
  formData.value = {
    num:'',
    description:'',
    images:[],
    types_chambres_id:'',
  }; // Reset each field to its initial value
}
onMounted(() => {
  fetchTypes();
});
</script>

<template>
  <div class="d-flex flex-row align-items-center justify-content-center">
    <CCard class="col-6">
      <CCardHeader>Ajouter chambre</CCardHeader>
      <CCardbody>
        <CForm @submit.prevent="sendData" class="px-4 py-4">
          <FilePond
            ref="pond"
            v-model="formData.images"
            label-idle="Glissez-déposez vos fichiers ou <span class='filepond--label-action text-dark fw-bold'>Parcourir</span>"
            allow-multiple="true"
            accepted-file-types="image/png, image/jpeg, image/jpg"
            image-edit-instant-edit
            @init="handleFilePondInit"
            @updatefiles="updateFiles"
          />
          <div class="row mt-10" >
            <div class="col-6 col-12-sm">
              <CFormLabel >Numéro de chambre</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Numéro de chambre"
                required
                v-model="formData.num"
              />
            </div>
            <div class="col-6 col-12-sm">
              <CFormLabel >Type de chambre</CFormLabel>
              <CFormSelect
                aria-label="Default select "
                v-model="formData.types_chambres_id"
              >
                <option>Selectionner</option>
                <option
                  v-for="option in types.typeChambre"
                  :value="option.id"
                  :key="option.id"
                  :selected="option === room.type"
                >{{ option.name }}</option>
              </CFormSelect>
            </div>
          </div>
          <div class="mt-5" >
            <CFormLabel for="Type">Description</CFormLabel>
            <CFormInput
              type="text"
              placeholder="Description"
              required
              v-model="formData.description"
            />
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
