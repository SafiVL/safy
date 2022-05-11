import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    playlist: [
      { title: 'Dolphin Japanese version', artist: 'Oh my girl', src: 'playlist/Dolphin_Japanese_version.mp3', img: 'album/Oh_my_girl.jpg'},
      { title: 'vertigo', artist: 'rizza', src: 'playlist/vertigo.mp3', img: 'album/rizza.jpg'},
      { title: 'Gods_Menu', artist: 'Stray Kids', src: 'playlist/Gods_Menu.mp3', img: 'album/skz_golife.jpg'},
      { title: 'Any', artist: 'Stray Kids', src: 'playlist/Any.mp3', img: 'album/straykids.jpeg'}
    ],
    song: null
  }),
  getters: {
  },
  actions: {
  },
});
