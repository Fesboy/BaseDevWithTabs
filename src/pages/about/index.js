import React, { useEffect } from "react";

import styles from "./index.less";

export default function About() {
  useEffect(() => {
    console.log("about 页面发起请求");
  }, []);

  return <div className={styles.about}>About Page</div>;
}
