import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers/router";
import Vuelidate from "@vuelidate/core";
import '@fortawesome/fontawesome-free/css/all.css'


import "./assets/main.css";
import "./assets/styles.css";

createApp(App).use(router).use(Vuelidate).mount("#app");
