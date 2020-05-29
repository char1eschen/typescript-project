import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Button, Form, FormItem, Message, Input } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
