<script setup>
import { onMounted, computed } from 'vue'
import { qsys, fnGetQsys, permitQsys } from 'composables/qsys/useQsys.js'
import { fnCheckActiveZones } from 'composables/status/useStatus.js'
import { useQsysFunc } from 'composables/qsys/useQsysFunc.js'
import { user } from 'composables/user/useUser.js'

const { fnCancelAll } = useQsysFunc()

onMounted(() => {
  fnGetQsys()
})
</script>

<template>
  <q-tree
    :nodes="permitQsys"
    node-key="_id"
    children-key="ZoneStatus"
    no-node-label="방송구간이 없습니다."
  >
    <template v-slot:header-root="prop">
      <div class="row fit items-center q-gutter-x-sm">
        <q-icon :color="prop.node.connected ? 'green' : 'red-10'" name="location_on" size="xs" />
        <div class="text-bold">
          {{ prop.node.name }}
        </div>
        <q-space />
        <div>{{ fnCheckActiveZones(prop.node.ZoneStatus) }}개 지역 방송중</div>
        <div v-if="fnCheckActiveZones(prop.node.ZoneStatus)">
          <q-btn
            color="red"
            size="xs"
            round
            flat
            icon="cancel"
            @click.prevent.stop="fnCancelAll(prop.node)"
          />
        </div>
      </div>
    </template>
    <template v-slot:default-header="prop">
      <div class="row items-center q-gutter-x-sm">
        <div>
          {{ prop.node.name ? prop.node.name : 'no name' }}
          <q-badge v-if="prop.node.Active" color="green"> Onair </q-badge>
        </div>
      </div>
    </template>
  </q-tree>
</template>
<style scoped></style>
