<script setup>
import avatar from '@/assets/images/avatars/8.jpg'
import {useRouter} from "vue-router";
import {ref} from "vue";
const router = useRouter()
const data = ref(null)
const logout = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    data.value = await response.json();
    // Clear token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('hotel');

    // Redirect to login page
    await router.push('/auth/login');
  } catch (error) {
    console.error("Failed to logout from the server:", error);
  }
};

const apiUrlPic = 'http://127.0.0.1:8000/storage/';

const user = JSON.parse(localStorage.getItem('user'));

console.log('USer :', user);
</script>

<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="`${apiUrlPic}${user.picture}`" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownItem disabled> <CIcon icon="cil-user" /> Profile </CDropdownItem>
      <CDropdownItem disabled> <CIcon icon="cil-settings" /> Paramètre </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem @click="logout">   <CIcon icon="cil-lock-locked" /> Logout </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>
