import React, { Suspense, useState, useCallback, useEffect } from "react";

import { GlobalHeader, Sider, PageMarker } from "@/components";
import { title, username } from "@/utils/config";
import { menus } from "@/common/router";
import history from "@/common/history";
import logo from "@/assets/images/logo.png";
import styles from "./BaseLayout.less";

export default function BaseLayout() {
  const [selectedMenus, setSelectedMenus] = useState([
    history.location.pathname
  ]);

  const onMenuChange = useCallback(e => {
    if (e.key === history.location.pathname) return;
    history.push(e.key);
  });

  useEffect(() => {
    history.listen(location => {
      setSelectedMenus([location.pathname]);
    });
  }, [setSelectedMenus]);

  return (
    <div className={styles.baseLayout}>
      <GlobalHeader logo={logo} title={title} username={username} />
      <Sider
        menus={menus}
        selectedMenus={selectedMenus}
        onMenuChange={onMenuChange}
      />
      <div className={styles.pageContainer}>
        <PageMarker />
      </div>
    </div>
  );
}
