import React, { memo, useEffect, useCallback } from "react";

import history from "@/common/history";
import styles from "./index.less";

function List() {
  useEffect(() => {
    console.log("list 页面发起请求");
  }, []);

  const goToDetail = useCallback(() => {
    history.push("/list/detail");
  }, []);

  return (
    <div className={styles.list}>
      List Page
      <p onClick={goToDetail}>go to detail</p>
    </div>
  );
}

export default memo(List);
