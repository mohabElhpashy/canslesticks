import React from "react";
import styles from "./Layout.module.css";
import Candlestick from "../CandleSticks/CandleSticks";

const layout = (props) => (
  <>
    <main className={styles.Layout}>
      <Candlestick />
    </main>
  </>
);

export default layout;
