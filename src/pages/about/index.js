import React, { useEffect, memo } from "react";

import styles from "./index.less";

function About() {
  useEffect(() => {
    console.log("about 页面发起请求");
  }, []);

  return <div className={styles.about}>About Page</div>;
}

export default memo(About);
