<template>
  <div class="home-page">
    <div class="buttons">
      <el-button type="primary" @click="handleCrowllerClick">Get</el-button>
      <el-button type="primary" @click="handleLogoutClick">Log out</el-button>
    </div>
    <div id="lineChart" style="height:300px;"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import request from "../request";

interface State {
  loaded: boolean;
  isLogin: boolean;
  data: responseResult.DataStructure;
}

@Component
export default class extends Vue {
  private state: State = {
    loaded: false,
    isLogin: true,
    data: {},
  };

  private renderChart() {
    let myChart = this.$echarts.init(document.getElementById("lineChart"));
    let option = {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };
    myChart.setOption(option);
  }

  private handleLogoutClick() {
    request.get("/api/logout").then((res) => {
      const data: responseResult.logout = res.data;
      if (data) {
        this.state.isLogin = false;
      } else {
        this.$message.error("log out failed");
      }
    });
  }

  private handleCrowllerClick() {
    request.get("/api/getData").then((res) => {
      const data: responseResult.getData = res.data;
      if (data) {
        this.$message({
          message: "get data successfully",
          type: "success",
        });
      } else {
        this.$message.error("get data unsuccessfully");
      }
    });
  }

  mounted() {
    request.get("/api/isLogin").then((res) => {
      this.state.loaded = true;
      const data: responseResult.isLogin = res.data;
      if (!data) {
        this.state.isLogin = false;
        // this.$router.push('login')
      }
    });

    request.get("/api/showData").then((res) => {
      const data: responseResult.DataStructure = res.data;
      if (data) {
        this.state.data = data;
      }
    });

    console.log(this.state.isLogin, this.state.data);
  }
}
</script>
<style scoped>
.home-page {
  padding: 0 50px;
}

.home-page .buttons {
  width: 200px;
  margin: 30px auto;
  padding: 20px;
}
</style>
