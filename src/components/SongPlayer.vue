<template lang="pug">
.row
  .col-4
    .text-subtitle1.q-ml-xl
      .row
        .col-1
          img.imgFooter(v-if="song.img" :src="song.img")
        .col.q-ml-md
          .text-white {{ song.title}}
          .text-grey-5 {{ song.artist }}
  .text-caption.text-grey-5.q-mt-xl {{ secondsToTime(progress) }}
  .col.text-center.q-mt-sm
    q-btn(@click="$emit('previous')" icon="skip_previous" flat)
    q-btn.q-mx-md(v-if="playing" @click="$emit('pause')" round icon="pause" flat)
    q-btn.q-mx-md(v-else @click="$emit('play', song)" round icon="play_arrow" flat)
    q-btn(@click="$emit('next')" icon="skip_next" flat)
  q-slider.q-mt-lg.absolute-center.sliderMusic(
    v-model="progress"
    @update:model-value="changeDuration"
    :min="0" :max="duration"
    :step="1" color="blue-grey-3"
    label
    :label-value="secondsToTime(progress)"
    )
  .text-caption.text-grey-5.q-mt-xl(v-if="duration") {{ secondsToTime(duration) }}
  //q-btn(icon="favorite" flat @click="$emit('addPlaylist', song)")
  //q-btn(icon="favorite_border" flat)
  .col-4
    q-item.sliderVolume.absolute-right.cursor-pointer
      q-item-section(side)
        q-icon(name='volume_down')
      q-item-section
        q-slider(v-model='volume' :min='0' :max='1' :step="0.01" color="blue-grey-3")
      q-item-section(side)
        q-icon(name='volume_up')
</template>

<script>

import { ref, watch, toRefs } from 'vue'

export default {
  name: 'SongPlayer',
  props: ['song', 'playing', 'player'],
  emits: ['changeVolume', 'play', 'pause', 'next', 'previous', 'addPlaylist'],
  setup(props, {emit}) {
    const progress = ref(0)
    const volume = ref(0.2)
    const { player } = toRefs(props)
    const duration = ref(0)

    emit('changeVolume', volume.value)
    watch(volume, () => {
      emit('changeVolume', volume.value)
    })
    const onTimeUpdate = (value) => {
      duration.value = player.value.duration
      progress.value = Math.floor(player.value.currentTime)
    }
    const changeDuration = (value) => {
      player.value.currentTime = value
      progress.value = player.value.currentTime
    }
    player.value.addEventListener('timeupdate', onTimeUpdate)
    const secondsToTime = (secs) => {
      return new Date(secs * 1000).toISOString().substr(14, 5)
    }

    return {
      volume,
      progress,
      duration,
      changeDuration,
      secondsToTime
    }
  }
}
</script>

<style>
.sliderVolume {
  width: 12%;
}
.sliderMusic {
  width: 25%;
}
.imgFooter {
  width: 60px;
  height: 60px;
}
</style>
