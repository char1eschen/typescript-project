<template>
  <div class="login-page">
    <el-form :model="form" status-icon :rules="rules" ref="form">
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import request from "../request";
import qs from "qs";

@Component
export default class Login extends Vue {
  private form = {
    password: "",
  };

  private rules = {
    password: [
      { required: true, message: "Please enter password", trigger: "blur" },
    ],
  };

  private submitForm() {
    const valid = (this.$refs.form as Vue & {
      validate: () => boolean;
    }).validate();

    if (valid) {
      request
        .post("api/login", qs.stringify({ password: this.form.password }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          const data: responseResult.login = res.data;
          if (data) {
            this.$router.push("/");
          } else {
            this.$message.error("login failed");
          }
        });
    } else {
      this.$message.error("error submit!!");
      return false;
    }
  }
}
</script>

<style>
.login-page {
  width: 300px;
  padding: 20px 20px 0 20px;
  margin: 100px auto;
  border: 1px solid #ccc;
}
</style>
