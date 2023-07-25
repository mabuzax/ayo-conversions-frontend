<template>
    <div>
      <h1>Ayo Convert</h1>
        <button @click="showAdd()">New Conversion</button>
        <div v-if="operationOutcome" class="warning-banner" >
            {{ operationOutcome }}
        </div>
        
      <table>
        <thead>
          <tr>
            <th>From Unit</th>
            <th>To Unit</th>
            <th>Conversion Factor</th>
            <th>Addend</th>            
          </tr>
        </thead>
        <tbody>
          <tr v-for="conversion in conversions" 
              :key="conversion.id"
              :class="{ 'edit-row': editRowId === conversion.id }">
            <td>{{ conversion.fromUnit }}</td>
            <td>{{ conversion.toUnit }}</td>
            <td>
              <input v-if="editRowId === conversion.id" v-model="editConversionData.convertFactor" type="number" @input="validateNumberInput($event)">
              <span v-else>{{ conversion.convertFactor }}</span>
            </td>
            <td>
              <input v-if="editRowId === conversion.id" v-model="editConversionData.addend" type="number" @input="validateNumberInput($event)">
              <span v-else>{{ conversion.addend }}</span>
            </td>
            <td class="centered">
              <template v-if="editRowId === conversion.id">
                <i class="fa fa-check text-success" @click="submitEdit(conversion)"></i>
                <i class="fa fa-cc-diners-club text-danger" @click="cancelEdit"></i>
              </template>
              <template v-else>
                <i class="fa fa-edit text-warning" @click="editConversion(conversion)"></i> 
                <i class="fa fa-times text-danger" @click="deleteConversion(conversion)"></i>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>



<script>
import { onMounted, ref } from "vue";
import axios from 'axios';
import router from "../../routers/router";
export default { 

  setup(props) {
        const conversions = ref([]);
        const operationOutcome = ref();
        const editRowId = ref(null);
        const editConversionData = ref({});
        
        const fetchData = () => {
            axios.get('/conversion/show/all', {
                        headers: {
                            "Accept": "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                        },
                        },)
            .then(response => {
                conversions.value = response.data.result;
                editRowId.value = null;
            }).catch((error) => {
                operationOutcome.value = error.response.data.result;

                setTimeout(() => {
                    operationOutcome.value = "";
                }, 4000);
        });
        }

        const showAdd = () => {
            router.push("/new");
        }

        const editConversion = (conversion) => {
            editRowId.value = conversion.id;
            editConversionData.value = { ...conversion };
        }

        const cancelEdit = () => {
            editRowId.value = null;
        }

        const submitEdit = (conversion) => {
            conversion.convertFactor = editConversionData.value.convertFactor;
            conversion.addend = editConversionData.value.addend;
            axios.put('/conversion/update', conversion,{
                        headers: {
                            "Accept": "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                        },
                        },)
            .then(response => {
                operationOutcome.value = "Successfully updated";
                fetchData();

                setTimeout(() => {
                    operationOutcome.value = null;
                }, 3000);

            }) .catch((error) => {
                operationOutcome.value = error.response.data.result;

                setTimeout(() => {
                    operationOutcome.value = "";
                }, 4000);
            });
        }

        const deleteConversion = (conversion) => {
            axios.delete('/conversion/remove?fromUnit=' + conversion.fromUnit + "&toUnit=" + conversion.toUnit, {
                        headers: {
                            "Accept": "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                        },
                        },)
            .then(response => {
                operationOutcome.value = response.data.result;
                fetchData();

                setTimeout(() => {
                    operationOutcome.value = null;
                }, 3000);

            }).catch((error) => {
                operationOutcome.value = error.response.data.result;

                setTimeout(() => {
                    operationOutcome.value = "";
                }, 4000);
        });
        }

        const validateNumberInput = (event) => {
            const value = event.target.value;
            if (!/^(\d+\.?\d*|\.\d+)$/.test(value)) {
                event.target.value = value.slice(0, -1);
            }
        };



        onMounted(() => {
            fetchData();
        });

        return {
            conversions,
            fetchData,
            editConversion,
            deleteConversion,
            cancelEdit,
            submitEdit,
            editRowId,
            editConversionData,
            operationOutcome,
            validateNumberInput,
            showAdd,
        };

    }
}
</script>


<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .centered {
    text-align: center;
  }
  
  .icon {
    margin: 10px;
  }

.text-warning {
    color: goldenrod;
    margin: 5px;
    border: solid 1px lightgrey;
    border-radius: 4px;
    padding: 2px;
    cursor: pointer;
  }
  
  .text-danger {
    color: red;
    margin: 5px;
    border: solid 1px lightgrey;
    border-radius: 4px;
    padding: 2px;
    cursor: pointer;
    background: white;
  }

  .text-success {
    color: rgb(41, 206, 0);
    margin: 5px;
    border: solid 1px lightgrey;
    border-radius: 4px;
    padding: 2px;
    cursor: pointer;
    background: white;
  }
  .warning-banner {
    background-color: #ffd6a0;
    color: rgb(0, 0, 0);
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
}

.edit-row {
    background-color: rgb(224, 252, 224);
  }
  
  
</style>

