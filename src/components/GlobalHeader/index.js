import React from "react";
import { Avatar } from "antd";

import avatar from "@/assets/images/avatar.jpg";
import styles from "./index.less";

export default function GlobalHeader({ logo, title, username }) {
  return (
    <div className={styles.globalHeader}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="logo" />
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.user}>
        <Avatar className={styles.avatar} src={avatar} shape="circle" />
        <span className={styles.username}>{username}</span>
      </div>
    </div>
  );
}
