<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
// composables
import useNotify from 'src/composables/useNotify'

const { notifyInfo, notifyError } = useNotify()

// variables
const qsysId = ref('')
const barixId = ref('')
const ttsId = ref('')
const qsysCurrentId = ref('')
const barixCurrentId = ref('')
const ttsCurrentId = ref('')

// functions
const updateBrigdeId = async (type, id) => {
  try {
    if (type === 'qsys' && qsysId.value === qsysCurrentId.value) return
    if (type === 'barix' && barixId.value === barixCurrentId.value) return
    if (type === 'tts' && ttsId.value === ttsCurrentId.value) return
    const r = await api.post('/bridge', { data: { type, id } })
    if (r.data && r.data.result) {
      switch (type) {
        case 'qsys':
          qsysId.value = qsysCurrentId.value
          break
        case 'barix':
          barixId.value = barixCurrentId.value
          break
        case 'tts':
          ttsId.value = ttsCurrentId.value
          break
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
        case 'tts':
          ttsId.value = d.id
          ttsCurrentId.value = d.id
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
  <div class="q-pa-md">
    <div class="borderd">
      <!-- title -->
      <div class="q-px-lg q-py-sm row no-wrap items-center bg-grey-2">
        <q-icon name="dns" size="20px" color="primary" />
        <div class="text-h6">Device ID</div>
      </div>
      <div class="q-pa-lg q-gutter-y-sm">
        <!-- qsys bridge block -->
        <div class="row no-wrap">
          <div class="self-center">Q-SYS Bridge</div>
          <q-space />
          <q-input
            v-model="qsysCurrentId"
            style="min-width: 350px; width: 50%"
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
        <!-- barix block -->
        <div class="row no-wrap">
          <div class="self-center">BARIX Bridge</div>
          <q-space />
          <q-input
            v-model="barixCurrentId"
            style="min-width: 350px; width: 50%"
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
        <!-- TTS block -->
        <div class="row no-wrap">
          <div class="self-center">TTS</div>
          <q-space />
          <q-input
            v-model="ttsCurrentId"
            style="min-width: 350px; width: 50%"
            outlined
            dense
          >
            <template #append>
              <q-icon
                :class="ttsId !== ttsCurrentId ? 'cursor-pointer' : 'disabled'"
                name="check_circle"
                color="primary"
                @click="updateBrigdeId('tts', ttsCurrentId)"
              />
            </template>
          </q-input>
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
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px 20px;
}
</style>
