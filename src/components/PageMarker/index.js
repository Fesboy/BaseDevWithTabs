import React, { Suspense, useState, useEffect, useCallback } from "react";
import { Tabs } from "antd";

import { LazyLoader } from "@/components";
import history from "@/common/history";
import { routesMap, menusMap } from "@/common/router";
import styles from "./index.less";

const TabPane = Tabs.TabPane;

function render(Component) {
  return <Component />;
}

export default function PageMarker() {
  const { pathname } = history.location;
  const [activeTab, setActiveTab] = useState(pathname);
  const [openPaths, setOpenPaths] = useState([pathname]);

  useEffect(() => {
    function handlePath(location) {
      const { pathname } = location;
      if (!openPaths.includes(pathname)) {
        setOpenPaths([...openPaths, pathname]);
      }
      setActiveTab(location.pathname);
    }

    return history.listen(handlePath);
  }, [openPaths]);

  const handleTabChange = useCallback(key => {
    history.push(key);
  });

  const handleEditTab = useCallback(
    key => {
      const currentIndex = openPaths.findIndex(path => path === key);
      const leftTab = openPaths[currentIndex - 1];
      const rightTab = openPaths[currentIndex + 1];
      setOpenPaths(openPaths.filter(path => path !== key));

      if (activeTab === key) {
        setActiveTab(leftTab || rightTab);
      }
    },
    [openPaths, activeTab]
  );

  const closable = openPaths.length > 1;

  return (
    <div className={styles.pageMarker}>
      <Tabs
        type="editable-card"
        animated={false}
        hideAdd
        activeKey={activeTab}
        onChange={handleTabChange}
        onEdit={handleEditTab}
      >
        {openPaths.map(path => (
          <TabPane key={path} tab={menusMap[path]} closable={closable}>
            <Suspense fallback={<LazyLoader />}>
              {render(routesMap[path].component)}
            </Suspense>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}
