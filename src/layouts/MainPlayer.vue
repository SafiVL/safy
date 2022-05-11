<template lang="pug">
player-title-bar.bg-grey-8.text-grey-4
</template>

<script>
import PlayerTitleBar from 'components/PlayerTitleBar'

export default {
  name: 'MainPlayer',
  components: { PlayerTitleBar },
  setup () {
  }
}
</script>

<style lang="scss">
.player-title-bar:hover {
  color: #00e200;
}
</style>
