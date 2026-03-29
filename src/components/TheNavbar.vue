<template>
  <header class="header">
    <h2>Sopa de letras: Los colores</h2>
    <button class="teacher-nav-btn" @click="$emit('open-teacher')" title="Teacher Login">
      &#9997;
    </button>
  </header>
</template>

<script>
export default {
}
</script>

<style scoped>
.teacher-nav-btn {
  margin-left: auto;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.3);
  color: #E5E7EB;
  font-size: 1rem;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  line-height: 1;
}
.teacher-nav-btn:hover {
  background: rgba(255,255,255,0.1);
}
</style>
