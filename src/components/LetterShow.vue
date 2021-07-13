<template>
  <div 
    class="letter-box" :style="{ 'background-color': color }"
    >
      <h1 class="main-letter" :id="id"
        @touchmove="collectElements"
        @mouseover="collectElements"
        > {{ msg }} </h1>
      
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'LetterShow',
  props: {
    msg: String,
    id: Number,
    color: String
  },
  computed: {
    ...mapGetters([
        'getLoggerStatus',
        'getCollectedItems'
    ])
  },
  methods: {
    collectElements(e) {
      if(this.getLoggerStatus) {
        console.log(e.target.innerText)
        this.$store.dispatch('updateCollectedItems', e.target.innerText)
        this.$store.dispatch('updateCollectedKeys', e.target.id)

      }
      else {
        console.log("Stop Collecting")
        }
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
