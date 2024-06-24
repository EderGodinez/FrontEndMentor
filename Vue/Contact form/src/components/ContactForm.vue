
<template>
     
    <div class="contact_form" style="position: relative;">
      <div class="toast" id="toast">
        <div class="toast__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  style="fill: white;">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <div class="toast__title">
            <p>Form submitted successfully!</p>
        </div>
        </div>
        
        <div class="toast_desc">
            <p >We will get back to you as soon as possible.</p>
        </div>
        
    </div>
      <h1>Contact Us</h1>
      <form @submit.prevent="submitForm">
        <div class="field_container">
          <textField fieldname="firstName" :errors="errors.firstName"  @update="saveValues($event)"/>
          <textField fieldname="lastName" :errors="errors.lastName" @update="saveValues($event)"/>
        </div>
        <textField fieldname="email" :errors="errors.email" @update="saveValues($event)"/>
        <label for="queryType" style="align-self: flex-start;">Query type</label>
        <div class="radio_field_container">
          <div class="radio_field">
            <input type="radio" name="queryType" id="generalEnquiry" :checked="form.queryType.value === 'general'" @change="toggleQueryType('general')">
            <label for="generalEnquiry">General Enquiry</label>
          </div>
          <div class="radio_field">
            <input type="radio" name="queryType" id="supportRequest" :checked="form.queryType.value === 'support'" @change="toggleQueryType('support')">
            <label for="supportRequest">Support Request</label>
          </div>
        </div>
        <small v-if="errors.queryType" style="align-self: flex-start;">{{ errors.queryType }}</small>
        <div class="text_field">
          <label for="message">Message:</label>
          <textarea id="message" rows="10" v-model="form.message.value" :class="{'has-error': errors.message}"></textarea>
          <small v-if="errors.message">{{ errors.message }}</small>
        </div>
        <div style="align-self: flex-start;">
          <input id="acceptTerms" name="acceptTerms" type="checkbox" v-model="form.acceptTerms.value">
          <label for="acceptTerms">I consent to being contacted by the team</label>
        </div>
        <small v-if="errors.acceptTerms" style="align-self: flex-start;">{{ errors.acceptTerms }}</small>
        <button type="submit">Submit</button>
      </form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import textField from './textField.vue'
import  Validator  from '@/utils/textValidators';
    const form = reactive({
      firstName: {value:'',Validate:[Validator.required, Validator.minLength(2), Validator.maxLength(20)]},
      lastName: {value:'',Validate:[Validator.required, Validator.minLength(2), Validator.maxLength(20)],},
      email: {value:'',Validate:[Validator.required, Validator.email],},
      message: {value:'',Validate:[Validator.required, Validator.minLength(10), Validator.maxLength(200)],},
      queryType: {value:'',Validate:[Validator.required],},
      acceptTerms: {value:'',Validate:[Validator.required]}
    })

    const errors = reactive({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      queryType: '',
      acceptTerms: ''
    })
    const saveValues = ($event:any) => {
      form[$event.fieldname].value = $event.newValue
    }
    const validateForm = () => {
    Validator.reset();
    Object.keys(form).forEach(field => {
    Validator.validateField(field, form[field].value, form[field].Validate);
   });

   const newErrors = Validator.getErrors();
   Object.keys(errors).forEach(key => {
    errors[key] = newErrors[key] || '';
   });
    };
    const submitForm = () => {
      validateForm()
      if (!errors.firstName && !errors.lastName && !errors.email && !errors.message && !errors.queryType && !errors.acceptTerms) {
        document.getElementById('toast')?.classList.add('active');
        setTimeout(() => {
          document.getElementById('toast')?.classList.remove('active');
        }, 6000);
      } else {
        console.log('Form has errors.')
      }
    }

    const toggleQueryType = (queryType:string) => {
      form.queryType.value = queryType
    }
</script>

<style scoped>
small {
  font-size: 12px;
  color: red;
}
.contact_form{
    font-family: Karla;
    width: 90%;
    height: auto;
    max-width: 800px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    background: hsl(0, 0%, 100%);
    border-radius: 10px;
}
form{
  flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    width: 100%;
}
.toast {
        transition: all 0.5s ease-in-out;
        color: aliceblue;
        width: 100%;
        max-width: 500px;
        border-radius: 20px;
        position:absolute;
        top:-250px;
        left: 50%; /* Centra en relación al borde izquierdo del padre */
  transform: translateX(-50%); /* Centra el elemento horizontalmente */
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:rgb(42, 66, 68);
        padding: 6px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 16px;
    }

    .toast__icon {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }

    .toast__title {
        font-size: 14px;
    }
    .toast_desc{
        display: block;
        font-size: 12px;
    }
    .toast.active {
  animation: appear 6s ease forwards;
}
input[type="radio"],
input[type="checkbox"] {
  accent-color: hsl(169, 82%, 27%);
}
.radio_field{
  min-width: 350px;
    flex: 1;
  border-radius: 8px;
    border: 1px solid hsl(169, 82%, 27%);
    padding: 10px;
    width: calc(100% - 25px);
    font-size: 16px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
}
.radio_field input{
  color: hsl(169, 82%, 27%);
}

.radio_field:has(input:where(:checked)) {
  background-color: hsl(148, 38%, 91%);
}
input:focus, textarea:focus, input:active, textarea:active{
  background-color: hsl(148, 38%, 91%);
    outline: none;
    border: 1px solid hsl(169, 82%, 27%);
}

.text_field{
    min-width: 350px;
    flex: 1;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
}
.text_field label::after{
    content: '*';
    color: hsl(169, 82%, 27%);
    margin-left: 5px;

}
.field_container{
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
}
.radio_field_container{
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
}
button{
  width:  100%;
    padding: 10px;
    border-radius: 5px;
    background-color:hsl(169, 82%, 27%);
    color: aliceblue;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
}
h1{
  align-self: flex-start;
    font-size: 24px;
    font-weight: 400;
    color: hsl(0, 0%, 0%);
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
input.has-error:not([type="checkbox"]):not([type="radio"]),
textarea.has-error {
  border-color: red;
}
@keyframes appear {
  0% {
    display: flex;
    top: -150px;
    opacity: 0;
  }
  10% {
    top: -40px; /* Position where the toast will be visible */
    opacity: 1;
  }
  60% {
    top: -40px;
    opacity: 1;
  }
  100% {
    top: -100px;
    opacity: 0;
    display: none;
  }
  }
</style>