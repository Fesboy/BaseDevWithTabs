import React, { memo, useEffect } from "react";

import styles from "./index.less";

function Detail() {
  useEffect(() => {
    console.log("detail 页面发起请求");
  }, []);

  return <div className={styles.list}>Detail Page</div>;
}

export default memo(Detail);
