<script setup>
import { useRouter } from 'vue-router'

const $r = useRouter()
const props = defineProps({
  name: String,
  items: Array,
  offset: { type: Array }
})
const menus = [
  { name: 'User management', icon: 'group', link: '/admin/users' },
  { name: 'Device management', icon: 'dns', link: '/admin/devices' },
  { name: 'System log', icon: 'list_alt', link: '/admin/logs' }
]
</script>

<template>
  <div class="btn cursor-pointer">
    {{ name }}
    <span class="down-icon">&#9660;</span>
    <q-menu :offset="offset">
      <div class="q-py-sm">
        <div
          v-for="(item, idx) in items"
          :key="idx"
          class="row no-wrao items-center q-gutter-x-sm q-px-md q-py-sm menu-item cursor-pointer"
          v-close-popup
          @click="$r.push(item.link)"
        >
          <q-icon
            :name="item.icon"
            color="primary"
            :size="item.iconSize ? iconSize : '20px'"
          />
          <div class="ubuntumono-font">{{ item.name }}</div>
        </div>
      </div>
    </q-menu>
  </div>
</template>

<style scoped>
.menu-layout {
  padding: 10px 20px;
}
.menu-width {
  min-width: 180px;
}
.down-icon {
  font-size: 10px;
  color: #888;
}
</style>
