<script setup>
import { ref, onMounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'
// props
const props = defineProps({ files: Array })
// emits
const emits = defineEmits([...useDialogPluginComponent.emits])
// initialize
const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } = useDialogPluginComponent()
// variables
const list = ref([])

onMounted(() => {
  list.value = [...props.files]
})
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="border-radius: 0.6rem">
      <q-card-section>
        <div class="q-px-sm">
          <div class="dialogName">파일(폴더)삭제</div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-px-sm">
          <div v-for="(item, idx) in list" :key="idx">
            <div v-if="item.name !== '..'">
              <span v-if="item.type === 'folder'"
                ><q-icon name="folder" color="yellow-8"></q-icon
              ></span>
              {{ item.base }}
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <div class="q-px-sm">
          <q-btn round flat color="red-10" icon="cancel" @click="onDialogCancel" />
          <q-btn round flat no-caps color="primary" icon="check_circle" @click="onDialogOK(name)" />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.dialogName {
  font-size: 1rem;
  font-family: ubuntumono;
  font-weight: bold;
}
</style>
