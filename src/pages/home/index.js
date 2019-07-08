import React, { useEffect } from "react";

import styles from "./index.less";

export default function Home() {
  useEffect(() => {
    console.log("home 页面发起请求");
    fetch("/api/user/name")
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
  }, []);

  return <div className={styles.home}>Home Page(fetch api)</div>;
}
