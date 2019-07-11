import React, { useEffect } from "react";
import { connect } from "dva";
import { Spin } from "antd";

import styles from "./index.less";

function Home({ home, loading, dispatch }) {
  useEffect(() => {
    console.log("home 页面发起请求");
    dispatch({
      type: "home/fetchUser"
    });
  }, []);

  return (
    <div className={styles.home}>
      Home Page(fetch api)(username:{" "}
      {loading.effects["home/fetchUser"] ? <Spin /> : home.user.name})
    </div>
  );
}

export default connect(({ home, loading }) => ({ home, loading }))(Home);
