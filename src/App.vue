<template>
  <div id="app">
    <the-navbar></the-navbar>
    <modal></modal>
    <div class="letter-container" id="selectable" 
      @mousedown="logElements" 
      @touchstart="logElements" 
      @mouseup="stopLogElements"
      @touchend="stopLogElements"
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
        'getAlphabet',
        'getLoggerStatus',
        'getCollectedItems',
        'getCollectedKeys',
        'getFundstueckCount'
    ])
  },
  methods: {
    logElements(e) {
      
      this.$store.dispatch('startLogging')
      this.$store.dispatch('emptyArray')
      this.$store.dispatch('updateCollectedItems', e.target.innerText)
      this.$store.dispatch('updateCollectedKeys', e.target.id)
      
      },
    stopLogElements() {
      this.$store.dispatch('stopLogging')
      
      let fundstueck = this.palabras.find(item => this.arrayEquals(item.solucion, this.getCollectedItems))
      
      if(fundstueck) {
        this.$store.dispatch('updateFundstueckCount')
        
        let alteredDataArray = this.getAlphabet.map(item => {
          if (this.getCollectedKeys.includes(item.key.toString())) {
            return item = {...item, color: fundstueck.color}
          }
          else {
            return item
          }
        })
        this.$store.dispatch('updateAlphabet', alteredDataArray)
          if (this.getFundstueckCount == 8) {
            console.log("Strike!")
            this.$store.dispatch('showModal')
          }
        }
      else {
        console.log("Nicht gefunden")
      }
      },
    arrayEquals(a, b) {
      return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
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



