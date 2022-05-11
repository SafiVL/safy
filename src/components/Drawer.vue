<template lang="pug">
q-drawer.bg-grey-9(show-if-above side='left')
  // drawer content
  q-splitter
    template(v-slot:before)
      q-tabs.text-grey-5.full-width(v-model='tab' vertical no-caps)
        q-tab(name='mails' icon='add' label='Создать плейлист')
        q-tab(name='alarms' icon="favorite" label='Любимые треки')
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Drawer',
  setup () {
    const tab = ref('mails')
    return {
      tab
    }
  }

}
</script>
