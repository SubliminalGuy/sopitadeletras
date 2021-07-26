<template>
  <div id="app">
    <the-navbar></the-navbar>
    <modal></modal>
    <div class="letter-container" id="selectable" 
      >
      <LetterShow
      v-for="letter in getAlphabet" 
      :key="letter.key" 
      :id="letter.key"
      :msg="letter.letra"
      :color="letter.color"
      
      ></LetterShow>
      </div>
      
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
import LetterShow from './components/LetterShow.vue'
import Modal from './components/Modal.vue'
import {mapGetters} from "vuex";


export default {
  name: 'App',
  data () {
    return {
      palabras: this.$store.state.palabras
    }
  },
  components: {
    LetterShow,
    TheNavbar,
    Modal
  },
  computed: {
    ...mapGetters([
        'getAlphabet'
    ])
  },
  mounted() {
    console.log("Mounted")
    
  }
}
</script>

<style>
@import "assets/css/style.css"

</style>



