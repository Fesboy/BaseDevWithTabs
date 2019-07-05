import React from "react";
import { Menu } from "antd";

import styles from "./index.less";

const MenuItem = Menu.Item;

export default function Sider({ menus, selectedMenus, onMenuChange }) {
  return (
    <div className={styles.sider}>
      <Menu selectedKeys={selectedMenus} onClick={onMenuChange}>
        {menus.map(menu => (
          <MenuItem key={menu.path}>{menu.name}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}
