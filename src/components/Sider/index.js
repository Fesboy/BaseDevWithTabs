import React, { memo } from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";

import styles from "./index.less";

const MenuItem = Menu.Item;

function Sider({ menus, selectedMenus, onMenuChange }) {
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

Sider.propTypes = {
  menus: PropTypes.array,
  selectedMenus: PropTypes.array,
  onMenuChange: PropTypes.func
};

export default memo(Sider);
