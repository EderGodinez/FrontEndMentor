<template>
 <div class="text_field">
            <label :for="props.fieldname">{{props.fieldname}}</label>
            <input type="text" :id="props.fieldname" :v-model="props.fieldname" :class="{'has-error': props.errors}" @input="saveValue">
            <small v-if="props.errors">{{ errors }}</small>
          </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  fieldname: string;
  errors: string | null; // Asumiendo que errors es de tipo string o null
}>()

const emit = defineEmits(['update'])
// Variable reactiva para almacenar el valor del campo
let fieldValue = ''
// Método para guardar el valor y emitir el evento
const saveValue = (e: Event) => {
  fieldValue = (e.target as HTMLInputElement).value
  emit('update', { newValue: fieldValue, fieldname: props.fieldname})
}
</script>
<style scoped>
.text_field{
    min-width: 350px;
    flex: 1;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    width: 100%;
}
.text_field label::after{
    content: '*';
    color: hsl(169, 82%, 27%);
    margin-left: 5px;
}
input.has-error:not([type="checkbox"]):not([type="radio"]),
textarea.has-error {
  border-color: red;
}
input:focus, textarea:focus, input:active, textarea:active{
  background-color: hsl(148, 38%, 91%);
    outline: none;
    border: 1px solid hsl(169, 82%, 27%);
}
input:not(:is([type="checkbox"], [type="radio"])),
textarea{
  font-family: Karla;
  font-weight: 400;
  resize: none;
  border-radius: 8px;
    border: 1px solid hsl(169, 82%, 27%);
    padding: 10px;
    width: calc(100% - 25px);
    font-size: 16px;
}
small {
  font-size: 12px;
  color: red;
}
</style>