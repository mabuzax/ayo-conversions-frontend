<template>
  <div>
      <ConversionTable />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import ConversionTable from './conversion/ConversionTable.vue';
import router from "../routers/router";

export default {
  name: "Home",
  components: {
    ConversionTable
  },

  
};
</script>
