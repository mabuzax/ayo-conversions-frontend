<template>
  <div> <h1>Ayo Convert</h1>
    <p style="color:red">Normally... You would need to be logged in for this screen. Was not a requirement for this exercise as it is mostly for the back-end</p>
  <div class="container">
    <div v-if="operationOutcome" class="warning-banner" >
      {{ operationOutcome }}
      <button type="button" @click="cancel">Continue</button>
  </div>
    <form v-if="!operationOutcome" @submit.prevent="submitForm">
      <label>From Unit: <input v-model="conversion.fromUnit" type="text"></label>
      <label>To Unit: <input v-model="conversion.toUnit" type="text"></label>
      <label>Conversion Factor: <input v-model="conversion.convertFactor" type="number" @input="validateNumberInput($event)"></label>
      <label>Addend: <input v-model="conversion.addend" type="number" @input="validateNumberInput($event)"></label>
      
      <div class="button-container">
        <button type="button" @click="cancel">Cancel</button>
        <button type="button" @click="createNewConfig(conversion)">Submit</button>        
      </div>

    </form>
  </div>
</div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import router from "../../routers/router";

export default {
  name: "Add",
  setup() {
    const operationOutcome = ref();
    const conversion = ref({
              fromUnit: '',
              toUnit: '',
              convertFactor: '',
              addend: '',
            });

    const createNewConfig = (conversion) => {      

      if (conversion.fromUnit && conversion.toUnit && conversion.convertFactor) {
        axios.post('/conversion/new', conversion,{
                        headers: {
                            "Accept": "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                        },
                  },)
            .then(response => {
                operationOutcome.value = "Successfully Created";
                

                setTimeout(() => {
                    operationOutcome.value = null;
                    router.push("/");
                }, 2000);

            }) .catch((error) => {
                operationOutcome.value = error.response.data.result;

                setTimeout(() => {
                    operationOutcome.value = "";
                }, 3000);
            });

        
      } else {
        alert('All fields except Addend are required!');
      }
    }

    const cancel = () => {
      router.push("/");
    }

    const validateNumberInput = (event) => {
            const value = event.target.value;
            if (!/^(\d+\.?\d*|\.\d+)$/.test(value)) {
                event.target.value = value.slice(0, -1);
            }
        };

    return {
      cancel,
      createNewConfig,
      conversion,
      operationOutcome,
      validateNumberInput,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgrey;
  padding: 20px;
  margin: auto;
  width: 50%;
}
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.button-container {
  display: flex;
  gap: 10px; 
}
</style>

