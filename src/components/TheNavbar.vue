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
  background: rgba(124, 58, 237, 0.2);
  border: 1px solid rgba(167, 139, 250, 0.4);
  color: #c4b5fd;
  font-size: 1rem;
  padding: 5px 12px;
  border-radius: 999px;
  cursor: pointer;
  line-height: 1;
  transition: background 0.15s, border-color 0.15s;
}
.teacher-nav-btn:hover {
  background: rgba(124, 58, 237, 0.4);
  border-color: #a78bfa;
}
</style>
