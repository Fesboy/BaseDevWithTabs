import React, { useEffect } from "react";

import styles from "./index.less";

export default function List() {
  useEffect(() => {
    console.log("list 页面发起请求");
  }, []);

  return <div className={styles.list}>List Page</div>;
}
