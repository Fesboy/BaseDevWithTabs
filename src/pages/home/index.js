import React, { useEffect } from "react";

import styles from "./index.less";

export default function Home() {
  useEffect(() => {
    console.log("home 页面发起请求");
  }, []);

  return <div className={styles.home}>Home Page</div>;
}
