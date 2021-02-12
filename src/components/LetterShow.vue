<template>
  <div class="letter-box">
      <h1 class="main-letter" @click="speak">{{ msg }}</h1>
      <p v-if="special" class="info-letter" @click="showModal">&#x2795;</p>
      <p v-else class="info-letter"></p>
  </div>
</template>

<script>
export default {
  name: 'LetterShow',
  props: {
    msg: String,
    special: Boolean
  },
  methods: {
    speak() {
      this.$emit('speakLetter', {msg: this.msg})
    },
    showModal() {
      this.$emit('showModal', {msg: this.msg })
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
