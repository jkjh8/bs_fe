<script setup>
import { ref, onMounted } from 'vue'
import { format } from 'quasar'
import { useDialogPluginComponent } from 'quasar'
import { fnStartPreview, fnInitAudioPlayer } from 'composables/files/usePreview'
import FolderTree from 'components/files/folderTree'
import FilesTable from 'components/files/filesTable'
import { files, folders, selectedFolder, fnUpdateSelectedFolder } from 'composables/files/useFiles'

const columns = [
  {
    name: 'name',
    label: 'NAME',
    field: 'name',
    align: 'left',
    sortable: true
  },
  {
    name: 'size',
    label: 'SIZE',
    field: 'size',
    sortable: true
  }
]

const selected = ref([])

const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } = useDialogPluginComponent()
const props = defineProps({ title: String, type: String })
const emit = defineEmits([...useDialogPluginComponent.emits])

const splitterModel = ref(20)

onMounted(async () => {})
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
        <q-splitter v-model="splitterModel">
          <template v-slot:before>
            <FolderTree
              class="q-pa-sm"
              :folders="folders"
              :selected="selectedFolder"
              @update:selected="fnUpdateSelectedFolder"
            />
          </template>
          <template v-slot:after>
            <q-table
              flat
              dense
              :columns="columns"
              :rows="files"
              row-key="name"
              selection="single"
              v-model:selected="selected"
              :pagination="{ rowsPerPage: 0 }"
            >
              <template #header="props">
                <q-tr :props="props">
                  <q-th auto-width>
                    <q-checkbox size="22px" v-model="props.selected" />
                  </q-th>
                  <q-th key="name" :props="props"> NAME </q-th>
                  <q-th key="size" :props="props"> SIZE </q-th>
                </q-tr>
              </template>
              <template #body="props">
                <q-tr :props="props">
                  <q-td auto-width>
                    <q-checkbox
                      size="22px"
                      v-model="props.selected"
                      v-if="props.row.name !== '..'"
                    />
                  </q-td>
                  <q-td key="name" :props="props">
                    <span v-if="props.row.type === 'folder'">
                      <q-icon name="folder_open" color="primary" size="16px" />
                    </span>
                    <span
                      v-if="props.row.type === 'folder'"
                      class="q-ml-xs cursor-pointer"
                      @click="emits('update:folder', props.row.fullpath)"
                    >
                      {{ props.row.name }}
                    </span>
                    <span v-else>
                      {{ props.row.name }}
                      <q-btn
                        flat
                        round
                        size="xs"
                        color="primary"
                        icon="play_arrow"
                        @click="emits('update:preview', props.row)"
                      />
                    </span>
                  </q-td>
                  <q-td key="size" :props="props">
                    {{ props.row.type !== 'folder' ? format.humanStorageSize(props.row.size) : '' }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </template>
        </q-splitter>
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
