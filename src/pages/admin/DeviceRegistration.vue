<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
// composables
import useNotify from 'src/composables/useNotify'

const { notifyInfo, notifyError } = useNotify()

// variables
let qsysId = ref('')
let barixId = ref('')
const qsysCurrentId = ref('')
const barixCurrentId = ref('')

// functions
const updateBrigdeId = async (type, id) => {
  try {
    if (type === 'qsys' && qsysId.value === qsysCurrentId.value) return
    if (type === 'barix' && barixId.value === barixCurrentId.value) return
    const r = await api.post('/bridge', { data: { type, id } })
    if (r.data && r.data.result) {
      if (type === 'qsys') {
        qsysId.value = qsysCurrentId.value
      }
      if (type === 'barix') {
        barixId.value = barixCurrentId.value
      }
    }
    notifyInfo(`Updated - ${type.toUpperCase()} - Bridge information`)
  } catch (err) {
    console.error(err)
    notifyError('Failed to update Brigde information')
  }
}

// lifecycle hooks
onMounted(async () => {
  try {
    const r = await api.get('/bridge')
    r.data.bridge.forEach((d) => {
      switch (d.type) {
        case 'qsys':
          qsysId.value = d.id
          qsysCurrentId.value = d.id
          break
        case 'barix':
          barixId.value = d.id
          barixCurrentId.value = d.id
          break
      }
    })
  } catch (err) {
    console.error(err)
    notifyError('Failed to get Bridge information')
  }
})
</script>

<template>
  <div class="page">
    <div class="list q-gutter-y-sm">
      <div class="text-bold">Device ID</div>
      <div class="q-pa-sm q-gutter-y-sm">
        <!-- qsys bridge block -->
        <div class="row no-wrap justify-between items-center">
          <div>Q-SYS Bridge</div>
          <div class="row no-wrap q-gutter-x-sm">
            <q-input
              v-model="qsysCurrentId"
              style="min-width: 300px"
              outlined
              dense
            >
              <template #append>
                <q-icon
                  :class="
                    qsysId !== qsysCurrentId ? 'cursor-pointer' : 'disabled'
                  "
                  name="check_circle"
                  color="primary"
                  @click="updateBrigdeId('qsys', qsysCurrentId)"
                />
              </template>
            </q-input>
          </div>
        </div>
        <!-- barix block -->
        <div class="row no-wrap justify-between items-center">
          <div>BARIX Bridge</div>
          <div class="row no-wrap q-gutter-x-sm">
            <q-input
              v-model="barixCurrentId"
              style="min-width: 300px"
              outlined
              dense
            >
              <template #append>
                <q-icon
                  :class="
                    barixId !== barixCurrentId ? 'cursor-pointer' : 'disabled'
                  "
                  name="check_circle"
                  color="primary"
                  @click="updateBrigdeId('barix', barixCurrentId)"
                />
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 20px;
}
.list {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 20px;
}
</style>
