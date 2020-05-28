import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, message } from "antd";
import request from "../../request";
import ReactEcharts from "echarts-for-react";
import moment from "moment";
import "./style.css";

interface State {
  loaded: boolean;
  isLogin: boolean;
  data: responseResult.DataStructure;
}

class Home extends Component {
  _isMounted = false;
  state: State = {
    loaded: false,
    isLogin: true,
    data: {},
  };

  componentDidMount() {
    this._isMounted = true;
    request.get("/api/isLogin").then((res) => {
      this.setState({
        loaded: true,
      });
      const data: responseResult.isLogin = res.data;
      if (!data) {
        if (this._isMounted) {
          this.setState({
            isLogin: false,
          });
        }
      }
    });

    request.get("/api/showData").then((res) => {
      const data: responseResult.DataStructure = res.data;
      if (data) {
        this.setState({
          data,
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleLogoutClick = () => {
    request.get("/api/logout").then((res) => {
      const data: responseResult.logout = res.data;
      if (data) {
        this.setState({
          isLogin: false,
        });
      } else {
        message.error("log out failed");
      }
    });
  };

  handleCrowllerClick = () => {
    request.get("/api/getData").then((res) => {
      const data: responseResult.getData = res.data;
      if (data) {
        message.success("get data successfully");
      } else {
        message.error("get data unsuccessfully");
      }
    });
  };

  getOption: () => echarts.EChartOption = () => {
    const { data } = this.state;
    const productNames: string[] = [];
    const times: string[] = [];
    const tempData: {
      [key: string]: number[];
    } = {};
    for (let i in data) {
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
    for (let i in tempData) {
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
  };

  render() {
    const { isLogin, loaded } = this.state;
    if (isLogin) {
      if (loaded) {
        return (
          <div className="home-page">
            <div className="buttons">
              <Button
                type="primary"
                style={{ marginRight: "9px" }}
                onClick={this.handleCrowllerClick}
              >
                Get
              </Button>
              <Button type="primary" onClick={this.handleLogoutClick}>
                Log out
              </Button>
            </div>
            <ReactEcharts option={this.getOption()} />
          </div>
        );
      }
      return null;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default Home;
