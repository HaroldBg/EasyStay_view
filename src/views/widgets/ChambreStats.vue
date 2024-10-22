<script setup>

import {CRow} from "@coreui/vue/dist/esm/components/grid";

//chambres disponibles
const nmbCh = 150
// chambres disponibles
const disCh = 120
// chambres occupés
const  occCh = 20
// chambres en Maintenance
const mainCh = 10
</script>


<template>
  <CRow :xs="{ gutter: 4 }">
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsA color="primary" style="height: 165px;">
        <template #value
        >{{ nmbCh }}
        </template>
        <template #title>Nombres de chambres</template>
      </CWidgetStatsA>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsA color="success" style="height: 165px;">
        <template #value
        >{{ disCh }}
        </template>
        <template #title>Chambres disponibles</template>
      </CWidgetStatsA>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsA color="warning" style="height: 165px;">
        <template #value
        >{{ occCh}}
        </template>
        <template #title>Chambres occupés</template>
      </CWidgetStatsA>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsA color="danger" style="height: 165px;">
        <template #value
        >{{ mainCh }}
        </template>
        <template #title>Chambres en Maintenance</template>
      </CWidgetStatsA>
    </CCol>
  </CRow>

</template>
<style scoped lang="scss">

</style>
