<template>
  <div id="app">
    <the-navbar @open-teacher="showTeacherPanel = true"></the-navbar>
    <div class="searchcolors">
      <p class="headline">{{ isTeacherMode ? 'Find the following words:' : 'Sucht die folgenden Farben in Spanisch:' }}</p>
      <div class="word-chips">
        <template v-if="isTeacherMode">
          <span v-for="word in customWords" :key="word" class="word-chip">{{ word }}</span>
        </template>
        <template v-else>
          <span class="word-chip">Amarillo</span>
          <span class="word-chip">Azul</span>
          <span class="word-chip">Blanco</span>
          <span class="word-chip">Naranja</span>
          <span class="word-chip">Negro</span>
          <span class="word-chip">Rojo</span>
          <span class="word-chip">Rosa</span>
          <span class="word-chip">Verde</span>
        </template>
      </div>
      <p class="explain">Markiert die gesuchten Wörter indem ihr erst den ersten Buchstaben des gesuchten Wortes clickt und danach den Letzten.</p>
      <p class="explain">Wenn ihr erfolgreich wart, ändert sich die Farbe des Wortes.</p>
    </div>
    <div>
      <modal></modal>
      <teacher-panel v-if="showTeacherPanel" @close="showTeacherPanel = false"></teacher-panel>
      <div class="letter-container" id="selectable">
        <LetterShow
          v-for="letter in getAlphabet"
          :key="letter.key"
          :id="letter.key"
          :msg="letter.letra"
          :color="letter.color"
        ></LetterShow>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
import LetterShow from './components/LetterShow.vue'
import Modal from './components/Modal.vue'
import TeacherPanel from './components/TeacherPanel.vue'
import {mapGetters} from "vuex";

export default {
  name: 'App',
  data() {
    return {
      palabras: this.$store.state.palabras,
      showTeacherPanel: false
    }
  },
  components: {
    LetterShow,
    TheNavbar,
    Modal,
    TeacherPanel
  },
  computed: {
    ...mapGetters([
      'getAlphabet',
      'getTeacherLoggedIn',
      'getCustomWords'
    ]),
    isTeacherMode() {
      return this.getTeacherLoggedIn && this.getCustomWords.length > 0;
    },
    customWords() {
      return this.getCustomWords;
    }
  },
  mounted() {
    console.log("Mounted")
  }
}
</script>

<style>
@import "assets/css/style.css"
</style>
