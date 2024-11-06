<script setup>
import {onMounted, ref} from 'vue'
import {useColorModes} from '@coreui/vue'

import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import AppHeaderDropdownAccnt from '@/components/AppHeaderDropdownAccnt.vue'
import {useSidebarStore} from '@/stores/sidebar.js'

const headerClassNames = ref('mb-4 p-0')
const {colorMode, setColorMode} = useColorModes('coreui-free-vue-admin-template-theme')
const sidebar = useSidebarStore()

onMounted(() => {
  document.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 0) {
      headerClassNames.value = 'mb-4 p-0 shadow-sm'
    } else {
      headerClassNames.value = 'mb-4 p-0'
    }
  })
})

const hotel = JSON.parse(localStorage.getItem('hotel'));
if (hotel) {
  console.log('Hotel :', hotel);
} else {
  console.log('No Hotel found');
}
</script>

<template>
  <CHeader :class="headerClassNames" position="sticky">
    <CContainer class="border-bottom px-4" fluid>

      <CHeaderToggler style="margin-inline-start: -14px" @click="sidebar.toggleVisible()">
        <CIcon icon="cil-menu" size="lg"/>
      </CHeaderToggler>

      <CHeaderNav class="d-none d-md-flex">
        <CNavItem>
          <CNavLink href="/dashboard"> Tableau de bord</CNavLink>
        </CNavItem>
      </CHeaderNav>

      <CHeaderNav class="ms-auto " >
        <CNavItem class="fs-5 fw-bolder">
          {{ hotel.nom }}
        </CNavItem>
      </CHeaderNav>

      <CHeaderNav>
        <li class="nav-item py-1">
          <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
        <CDropdown placement="bottom-end" variant="nav-item">
          <CDropdownToggle :caret="false">
            <CIcon v-if="colorMode === 'dark'" icon="cil-moon" size="lg"/>
            <CIcon v-else-if="colorMode === 'light'" icon="cil-sun" size="lg"/>
            <CIcon v-else icon="cil-contrast" size="lg"/>
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem
              :active="colorMode === 'light'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="setColorMode('light')"
            >
              <CIcon class="me-2" icon="cil-sun" size="lg"/>
              Light
            </CDropdownItem>
            <CDropdownItem
              :active="colorMode === 'dark'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="setColorMode('dark')"
            >
              <CIcon class="me-2" icon="cil-moon" size="lg"/>
              Dark
            </CDropdownItem>
            <CDropdownItem
              :active="colorMode === 'auto'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="setColorMode('auto')"
            >
              <CIcon class="me-2" icon="cil-contrast" size="lg"/>
              Auto
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <li class="nav-item py-1">
          <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
        <AppHeaderDropdownAccnt/>
      </CHeaderNav>
    </CContainer>
    <CContainer class="px-4" fluid>
      <AppBreadcrumb/>
    </CContainer>
  </CHeader>
</template>
