<script setup>
import { ref, onMounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import FileSelect from 'components/files/fileSelect.vue'
const selected = ref([])
const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent()
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card style="max-width: 90%; min-width: 70%">
      <q-card-section>
        <div class="row no-wrap q-gutter-x-xs items-center">
          <q-icon name="folder" color="primary" size="24px" />
          <div class="title">파일선택</div>
        </div>
      </q-card-section>
      <q-card-section>
        <FileSelect
          selection="single"
          :dialog="true"
          :selected="selected"
          @update:selected="(v) => (selected = v)"
        />
      </q-card-section>
      <q-card-actions align="right">
        <div class="q-px-sm">
          <q-btn round flat color="red-10" icon="cancel" @click="onDialogCancel" />
          <q-btn
            round
            flat
            no-caps
            color="primary"
            icon="check_circle"
            @click="onDialogOK(selected)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
