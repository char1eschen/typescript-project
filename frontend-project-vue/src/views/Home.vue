<template>
  <div class="home-page" v-if="state.loaded">
    <div class="buttons">
      <el-button type="primary" @click="handleCrowllerClick">Get</el-button>
      <el-button type="primary" @click="handleLogoutClick">Log out</el-button>
    </div>
    <div id="lineChart" style="height:300px"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import request from "../request";
import echarts from "echarts";
import moment from "moment";

interface State {
  loaded: boolean;
  // isLogin: boolean;
  data: responseResult.DataStructure;
}

@Component
export default class Home extends Vue {
  private state: State = {
    loaded: false,
    // isLogin: true,
    data: {},
  };

  private getOption(): echarts.EChartOption {
    const { data } = this.state;
    const productNames: string[] = [];
    const times: string[] = [];
    const tempData: {
      [key: string]: number[];
    } = {};
    for (const i in data) {
      const item = data[i];
      times.push(moment(Number(i)).format("MM-DD HH:mm"));
      item.forEach((innerItem) => {
        const { itemTitle, itemPrice } = innerItem;
        if (productNames.indexOf(itemTitle) === -1) {
          productNames.push(itemTitle);
        }
        tempData[itemTitle]
          ? tempData[itemTitle].push(itemPrice)
          : (tempData[itemTitle] = [itemPrice]);
      });
    }
    const result: echarts.EChartOption.Series[] = [];
    for (const i in tempData) {
      result.push({
        name: i,
        type: "line",
        data: tempData[i],
      });
    }
    return {
      title: {
        text: "price",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: productNames,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: times,
      },
      yAxis: {
        type: "value",
      },
      series: result,
    };
  }

  private renderChart() {
    const option = this.getOption();
    const myChart = echarts.init(
      document.getElementById("lineChart") as HTMLDivElement
    );
    myChart.setOption(option);
  }

  private handleLogoutClick() {
    request.get("/api/logout").then((res) => {
      const data: responseResult.logout = res.data;
      if (data) {
        // this.state.isLogin = false;
        this.$router.push("login");
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

  async mounted() {
    await request.get("/api/isLogin").then((res) => {
      const data: responseResult.isLogin = res.data;
      if (!data) {
        // this.state.isLogin = false;
        this.$router.push("login");
      } else {
        this.state.loaded = true;

        request
          .get("/api/showData")
          .then((res) => {
            const data: responseResult.DataStructure = res.data;
            if (data) {
              this.state.data = data;
            }
          })
          .then(() => {
            this.renderChart();
          });
      }
    });
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
