import React, { useEffect } from "react";

import styles from "./index.less";

export default function Detail() {
  useEffect(() => {
    console.log("detail 页面发起请求");
  }, []);

  return <div className={styles.list}>Detail Page</div>;
}
