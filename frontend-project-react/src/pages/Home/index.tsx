import React, { Component } from "react";
import { Button } from "antd";
import axios from "axios";
import "./style.css";

class Home extends Component {
  componentDidMount() {
    axios.get("/api/isLogin").then((res) => {
      console.log(res);
    });
  }

  render() {
    return (
      <div className="home-page">
        <Button type="primary" style={{ marginLeft: "9px" }}>
          Get
        </Button>
        <Button type="primary">Show</Button>
        <Button type="primary">Log out</Button>
      </div>
    );
  }
}

export default Home;
