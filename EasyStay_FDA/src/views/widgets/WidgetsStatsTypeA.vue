<script setup>
import { onMounted, ref } from 'vue'
import { CChart } from '@coreui/vue-chartjs'
import { getStyle } from '@coreui/utils'
import {CRow} from "@coreui/vue/dist/esm/components/grid";

const widgetChartRef1 = ref()
const widgetChartRef2 = ref()

onMounted(() => {
  document.documentElement.addEventListener('ColorSchemeChange', () => {
    if (widgetChartRef1.value) {
      widgetChartRef1.value.chart.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
      widgetChartRef1.value.chart.update()
    }

    if (widgetChartRef2.value) {
      widgetChartRef2.value.chart.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
      widgetChartRef2.value.chart.update()
    }
  })
})

//chambres disponibles
const nmbCh = 150
// chambres disponibles
const disCh = 120
// chambres occupés
const  occCh = 20
// chambres en Maintenance
const mainCh = 300
</script>

<template>
  <CRow :xs="{ gutter: 4 }">
    <CCol :sm="6" :xl="3" :xxl="3">
      <CWidgetStatsA color="primary" style="height: 165px;">
        <template #value
          >{{ nmbCh }}
        </template>
        <template #title>Nombres de chambres</template>
      </CWidgetStatsA>
    </CCol>
    <CCol :sm="6" :xl="3" :xxl="3">
      <CWidgetStatsA color="success" style="height: 165px;">
        <template #value
        >{{ disCh }}
        </template>
        <template #title>Chambres disponibles</template>
      </CWidgetStatsA>
    </CCol>
    <CCol :sm="6" :xl="3" :xxl="3">
      <CWidgetStatsA color="warning" style="height: 165px;">
        <template #value
        >{{ occCh}}
        </template>
        <template #title>Chambres occupés</template>
      </CWidgetStatsA>
    </CCol>
    <CCol :sm="6" :xl="3" :xxl="3">
      <CWidgetStatsA color="danger" style="height: 165px;">
        <template #value
        >{{ mainCh }}
        </template>
        <template #title>Chambres en Maintenance</template>
      </CWidgetStatsA>
    </CCol>
  </CRow>
</template>
