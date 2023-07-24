import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Add from "../components/conversion/Add.vue";

const routes = [  
  { path: "/", component: Home },
  { path: "/new", component: Add },
  { path: "/:catchAll(.*)", component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp({});
app.use(router);
app.mount("#app");

export default router;
