import React, { memo, useCallback } from "react";
import { Avatar } from "antd";

import history from "@/common/history";
import avatar from "@/assets/images/avatar.jpg";
import styles from "./index.less";

export default memo(function GlobalHeader({ logo, title, username }) {
  const openHome = useCallback(() => {
    if (history.location.pathname === "/") return;
    history.push("/");
  });

  return (
    <div className={styles.globalHeader}>
      <div className={styles.logoContainer} onClick={openHome}>
        <img className={styles.logo} src={logo} alt="logo" />
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.user}>
        <Avatar className={styles.avatar} src={avatar} shape="circle" />
        <span className={styles.username}>{username}</span>
      </div>
    </div>
  );
});
