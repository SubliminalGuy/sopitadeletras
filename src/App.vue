<template>
  <div id="app">
    <the-navbar></the-navbar>
    <modal></modal>
    <div class="letter-container" id="selectable" 
      @mousedown="logElements" 
      @touchstart="logElements" 
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
      // User Clicks First Time
      if (!this.getLoggerStatus) {
        this.$store.dispatch('startLogging')
        this.$store.dispatch('updateCollectedKeys', e.target.id)
      }
      // User Clicks Second Time
      else if (this.getLoggerStatus) {
        this.$store.dispatch('updateCollectedKeys', e.target.id)
        this.$store.dispatch('stopLogging')
        console.log("Collected Keys", this.getCollectedKeys)
        let fundstueck = this.palabras.find(item => this.arrayEquals(item.solucion, this.getCollectedKeys))
        if(fundstueck) {
          this.$store.dispatch('updateFundstueckCount')
          console.log("Fundstück Count", this.getFundstueckCount)
          let alteredDataArray = this.getAlphabet.map(item => {
            if (fundstueck.fields.includes(item.key.toString())) {
              
              return item = {...item, color: fundstueck.color}
            }
            else {
              return item
            }
          })
        
        // Check if user found all words
          this.$store.dispatch('updateAlphabet', alteredDataArray)
          if (this.getFundstueckCount == 8) {
            console.log("Strike!")
            this.$store.dispatch('showModal')
          } 
        }
        else {
            console.log("Nicht gefunden!")
          }
        this.$store.dispatch('emptyArray')
        console.log("Is Empty!", this.getCollectedKeys)
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



