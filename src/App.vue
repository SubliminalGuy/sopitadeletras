<template>
  <div id="app">
    <the-navbar></the-navbar>
    <modal
    @speakLetter="speakLetter" ></modal>
    <div class="letter-container">
      <LetterShow 
      @speakLetter="speakLetter" 
      @showModal="showModal" 
      v-for="letter in data" 
      :key="letter.letra" 
      :msg="letter.letra"
      :special="letter.special"
      ></LetterShow>
      </div>
  </div>
</template>

<script>
import Modal from './components/Modal'
import TheNavbar from './components/TheNavbar'
import LetterShow from './components/LetterShow.vue'
import {mapGetters} from "vuex";

/* Especiales: C, G, H, L, ene. Q, R, V, W */

export default {
  name: 'App',
  data () {
    return {
      data: this.$store.state.alphabet,
      synth: window.speechSynthesis,
      voiceSpanish: [],
      pronounciation: new window.SpeechSynthesisUtterance
    }
  },
  components: {
    LetterShow,
    Modal,
    TheNavbar
  },

  computed: {
    ...mapGetters([
        'getModal'
    ])
  },

  methods: {
    speakLetter({msg}) {
      var voiceList = this.synth.getVoices()
      this.voiceSpanish = voiceList.filter(item => item.name === "Jorge")
      this.pronounciation.text = msg.toLowerCase()
      this.pronounciation.voice = this.voiceSpanish[0]
      this.synth.speak(this.pronounciation)
    },

    showModal ({msg}) {
      let root = document.documentElement;
      let yOffset = window.pageYOffset + 100;
      root.style.setProperty('--y-scroll-offset', yOffset + "px");
      let letraInfo = this.$store.state.alphabet.filter(item => item.letra == msg)
      let letraInfoRojo = letraInfo[0].infotextRojo
      let letraInfoVerde = letraInfo[0].infotextVerde
      this.$store.dispatch('showModal', {msg, letraInfoRojo, letraInfoVerde})
        }

  },
  mounted() {
    this.speakLetter({msg: ""})
  }
}
</script>

<style>
@import "assets/css/style.css"

</style>

<style>
  
</style>


