<script setup >
import {onMounted, ref} from 'vue'
import { useToast } from 'vue-toastification';
import {useRouter} from "vue-router";
// Access router instance
const router = useRouter();
// Redirect if the user is already authenticated
onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    // Redirect to home page if token exists
    router.push('/dashboard');
  }
});
const formData = ref({
  email: '',
  password: ''
});
const data = ref(null)
const errorMessage = ref('');
const toast = useToast();
const submitLogin = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    });

     data.value = await response.json();
     console.log(data.value)
    if (response.ok){
      if (!data.value.error.error){
        // Store the token in localStorage or cookies
        localStorage.setItem('token', data.value.token);
        localStorage.setItem('user', JSON.stringify(data.value.user) );
        localStorage.setItem('hotel', JSON.stringify(data.value.hotel) );
        // Redirect to the protected page or home page
        await router.push('/dashboard') // Example of redirect
        // Show success toast
        toast.success(data.value.message);

      }else{
        // Show success toast
        toast.error(data.value.message);
      }
      console.log('Data sent successfully:', data.value)
    } else {
      toast.error(data.value.message);
      console.error('Server error:', data.value)
    }
  } catch (error) {
    errorMessage.value = error.message; // Show error to the user
  }
};
</script>
<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="5" :sm="8">
          <CCard class="p-4" >
            <CCardBody>
              <CForm @submit.prevent="submitLogin">
                <h1>Connection</h1>
                <p class="text-body-secondary">Connectez-vous à votre compte</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    placeholder="Mail"
                    v-model="formData.email"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Mot de passe"
                    v-model="formData.password"
                  />
                </CInputGroup>
                <CRow>
                  <CCol :xs="6">
                    <CButton type="submit" color="primary" class="px-4"> Se connecter </CButton>
                  </CCol>
                  <CCol :xs="6" class="text-right">
                    <CButton color="link" class="px-0">
                      Mot de passe oublier?
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
