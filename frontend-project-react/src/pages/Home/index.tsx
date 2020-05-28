import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, message } from "antd";
import axios from "axios";
import "./style.css";

class Home extends Component {
  _isMounted = false;
  state = {
    loaded: false,
    isLogin: true,
  };

  componentDidMount() {
    this._isMounted = true;
    axios.get("/api/islogin").then((res) => {
      this.setState({
        loaded: true,
      });

      if (!res.data?.data) {
        if (this._isMounted) {
          this.setState({
            isLogin: false,
          });
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleLogoutClick = () => {
    axios.get("/api/logout").then((res) => {
      console.log(res);
      if (res.data?.data) {
        this.setState({
          isLogin: false,
        });
      } else {
        message.error(res.data.errMsg);
      }
    });
  };

  render() {
    const { isLogin, loaded } = this.state;
    if (isLogin) {
      if (loaded) {
        return (
          <div className="home-page">
            <Button type="primary" style={{ marginLeft: "9px" }}>
              Get
            </Button>
            <Button type="primary">Show</Button>
            <Button type="primary" onClick={this.handleLogoutClick}>
              Log out
            </Button>
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
