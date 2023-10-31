<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'

const selected = ref(null)
const folders = ref(['media'])
const files = ref([])

const getFiles = async () => {
  const r = await api.get('/files', { parmas: folders.value.join('/') })
  console.log(r)
}
</script>

<template>
  <div class="q-pa-md">
    <div class="borderd">
      <!-- title -->
      <div class="q-px-md q-py-sm row items-center bg-grey-2">
        <div class="row no-wrap items-center q-gutter-x-sm full-width">
          <q-icon name="folder" size="20px" color="primary" />
          <span class="text-h6">Files</span>
          <div class="text-caption q-mt-xs q-ml-md">media</div>
          <q-space />
          <div class="row no-wrap">
            <q-btn
              round
              flat
              icon="create_new_folder"
              color="primary"
              size="sm"
            >
              <q-tooltip>New Folder</q-tooltip>
            </q-btn>
            <q-btn round flat icon="upload" color="primary" size="sm">
              <q-tooltip>File upload</q-tooltip>
            </q-btn>
            <q-btn round flat icon="download" color="primary" size="sm">
              <q-tooltip>File download</q-tooltip>
            </q-btn>
            <q-separator vertical spaced inset />
            <q-btn
              round
              flat
              icon="drive_file_rename_outline"
              color="primary"
              size="sm"
            >
              <q-tooltip>File rename</q-tooltip>
            </q-btn>
            <q-btn round flat icon="delete_outline" color="red" size="sm">
              <q-tooltip>Delete</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
      <!-- table -->
      <div>
        <q-table
          flat
          :columns="[
            {
              name: 'name',
              label: 'Name',
              field: 'name',
              align: 'left',
              sortable: true
            },
            {
              name: 'type',
              label: 'Type',
              field: 'type',
              align: 'center',
              sortable: true
            },
            {
              name: 'size',
              label: 'Size',
              field: 'size',
              align: 'center',
              sortable: true
            }
          ]"
          row-key="name"
          selection="single"
          v-model:selected="selected"
        >
          <template #header="props">
            <q-tr :props="props">
              <q-th
                name="name"
                align="left"
                field="name"
                :sortable="true"
                :auto-width="false"
                style="width: 60%"
                >Name</q-th
              >
              <q-th
                name="type"
                align="center"
                field="type"
                :sortable="true"
                :auto-width="false"
                >Type</q-th
              >
              <q-th
                name="size"
                align="center"
                field="size"
                :sortable="true"
                :auto-width="false"
                >Size</q-th
              >
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
