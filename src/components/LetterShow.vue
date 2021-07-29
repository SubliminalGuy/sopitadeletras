<template>
  <div 
    class="letter-box" :style="{ 'background-color': color }"
    @mousedown="logElements" 
    :id="id"
    >
      <h1 class="main-letter" :id="id"
        > {{ msg }} </h1>
      
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'LetterShow',
  data () {
    return {
      palabras: this.$store.state.palabras
    }
  },
  props: {
    msg: String,
    id: Number,
    color: String
  },
  computed: {
    ...mapGetters([
        'getLoggerStatus',
        'getCollectedKeys',
        'getFundstueckCount',
        'getAlphabet'
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
        //console.log("Collected Keys", this.getCollectedKeys)
        let fundstueck = this.palabras.find(item => this.arrayEquals(item.solucion, this.getCollectedKeys))
        if(fundstueck) {
          this.$store.dispatch('updateFundstueckCount')
            //console.log("Fundstück Count", this.getFundstueckCount)
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
            //console.log("Strike!")
            this.$store.dispatch('showModal')
          } 
        }/*
        else {
            console.log("Nicht gefunden!")
          }*/
        this.$store.dispatch('emptyArray')
        //console.log("Is Empty!", this.getCollectedKeys)
      }
    },     
    arrayEquals(a, b) {
      return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
    },
    logTouch(e) {
      console.log(e.target.id)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
