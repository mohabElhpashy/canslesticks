import React, { Component } from "react";
import Layout from "./Pages/Layout/Layout";
import styles from "./App.module.css";

class App extends Component {
  render() {
    return (
      <div>
        <div className={styles.Nav}>React Candlestick Chart</div>
        <Layout />
      </div>
    );
  }
}

export default App;
