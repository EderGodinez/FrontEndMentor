<template>
  <div id="container">
    <ContactForm />
  </div>
</template>
<style scoped> 
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: hsl(148, 38%, 91%);
}
</style>
<script setup lang="ts">
import ContactForm from './components/ContactForm.vue'
</script>

