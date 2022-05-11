<template lang="pug">
q-layout(view='hHh lpR fFf')
  q-header.bg-grey-9.text-white(elevated)
    q-toolbar
      q-toolbar-title
        .text-left My Music
  q-drawer.bg-grey-9(show-if-above side='left')
    q-splitter
      q-tabs.text-grey-4.full-width.full-width(v-model='tab' vertical no-caps)
        q-tab(name='alarms' icon='add' label='Создать плейлист')
        q-tab(name='likes' icon="favorite" label='Любимые треки')
  q-page-container
    q-page
      q-tab-panels(v-model='tab' animated swipeable vertical transition-prev='jump-up' transition-next='jump-up')
        q-tab-panel.text-grey-4.bg-grey-8(name='likes')
          .row
            .col-1
              img.heart.q-ma-xl(src="~assets/img/heart4.png")
            .text-subtitle1.categories Любимые треки
          .list.q-pl-sm.cursor-pointer(v-for="(song, index) in mainStore.playlist" :key="song.src" @click="selectMusic(index)")
            .text-subtitle1 {{ song.artist }} - {{ song.title }}
  q-footer.q-py-lg.bg-grey-9.text-white(elevated)
    q-toolbar
      q-toolbar-title
        song-player(
          :song="mainStore.playlist[currentSongIndex]"
          @next="playNext"
          @previous="playPrevious"
          @play="play"
          :playing="playing"
          @pause="pause"
          @changeVolume="changeVolume"
          :player="player"
          @addPlaylist="addPlaylist"
        )
</template>

<script>
import SongPlayer from 'components/SongPlayer'
import { ref } from 'vue'
import { useMainStore} from 'stores/main'

export default {
  name: 'PlayerTitleBar',
  components: { SongPlayer },
  setup() {
    const isPlaylistVisible = ref(false)
    const mainStore = useMainStore()
    const currentSongIndex = ref(0)
    const playing = ref(false)
    const likes = ref([])
    const tab = ref('likes')

    const addPlaylist = (song) => {
      likes.value.push(song)
    }
    const playNext = () => {
      if (currentSongIndex.value < mainStore.playlist.length - 1) {
        currentSongIndex.value += 1
      } else {
        currentSongIndex.value = 0
      }
      play(mainStore.playlist[currentSongIndex.value])
    }
    const playPrevious = () => {
      if (currentSongIndex.value !== 0) {
        currentSongIndex.value -= 1
      } else {
        currentSongIndex.value = mainStore.playlist.length - 1
      }
      play(mainStore.playlist[currentSongIndex.value])
    }
    const player = ref(new Audio())

    const play = (song) => {
      if (!player.value.src.includes(song.src)) {
        player.value.src = song.src
      }
      player.value.play()
      playing.value = true
    }
    player.value.addEventListener('ended', function () {
      currentSongIndex.value++
      if (currentSongIndex.value > playlist.length + 1) {
        currentSongIndex.value = 0
      }
      play(mainStore.playlist[currentSongIndex.value])
    })
    const changeVolume = (volume) => {
      player.value.volume = volume
    }
    const selectMusic = (index) => {
      currentSongIndex.value = index
      play(mainStore.playlist[currentSongIndex.value])
    }
    const pause = () => {
      player.value.pause()
      playing.value = false
    }

    return {
      play,
      mainStore,
      currentSongIndex,
      playNext,
      playPrevious,
      playing,
      pause,
      selectMusic,
      isPlaylistVisible,
      changeVolume,
      player,
      tab,
      addPlaylist
    }
  }
}
</script>

<style>
.heart {
  width: 115px;
}
.categories {
  margin-top: 65px;
  margin-left: 28px;
}
q-tabs {
  width: 299px !important
}
.list {
  width: 500px;
}
</style>
