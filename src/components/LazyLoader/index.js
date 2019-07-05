import React from "react";
import { Spin } from "antd";

import styles from "./index.less";

export default function LazyLoader() {
  return (
    <div className={styles.lazyLoader}>
      <Spin spinning />
    </div>
  );
}
