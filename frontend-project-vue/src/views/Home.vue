<template>
  <div class="login-page">
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";

export default {
  name: "Home",
  components: {
    Login,
  },
};
</script>
<style scoped>
.login-page {
  width: 300px;
  padding: 20px;
  margin: 100px auto;
  border: 1px solid #ccc;
}
</style>
