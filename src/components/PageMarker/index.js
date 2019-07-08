import React, {
  memo,
  Suspense,
  useState,
  useEffect,
  useCallback,
  useRef
} from "react";
import { Tabs, Icon, Tooltip } from "antd";

import { LazyLoader } from "@/components";
import history from "@/common/history";
import { routesMap, menusMap } from "@/common/router";
import styles from "./index.less";

const TabPane = Tabs.TabPane;

function render(Component) {
  return <Component />;
}

function PageMarker() {
  const { pathname } = history.location;

  const [activePage, setActivePage] = useState(pathname);
  const [markPages, setMarkPages] = useState([pathname]);

  const activePageRef = useRef(activePage);
  const markPagesRef = useRef(markPages);

  useEffect(() => {
    activePageRef.current = activePage;
    markPagesRef.current = markPages;
  });

  const handleHistoryChange = useCallback(
    location => {
      const { pathname } = location;
      if (!markPagesRef.current.includes(pathname)) {
        setMarkPages([...markPagesRef.current, pathname]);
      }
      setActivePage(pathname);
    },
    [markPagesRef]
  );

  useEffect(() => history.listen(handleHistoryChange), [handleHistoryChange]);

  const handleTabChange = useCallback(key => {
    history.push(key);
  });

  const handleEditTab = useCallback(
    key => {
      const currentIndex = markPagesRef.current.findIndex(path => path === key);
      const leftTab = markPagesRef.current[currentIndex - 1];
      const rightTab = markPagesRef.current[currentIndex + 1];
      setMarkPages(markPagesRef.current.filter(path => path !== key));

      if (activePageRef.current === key) {
        history.push(leftTab || rightTab);
      }
    },
    [markPagesRef, activePageRef]
  );

  const handleRemoveOtherPages = useCallback(() => {
    if (markPagesRef.current.length === 1) return;
    setMarkPages([history.location.pathname]);
  }, [markPagesRef]);

  const closable = markPages.length > 1;

  return (
    <div className={styles.pageMarker}>
      <Tabs
        type="editable-card"
        animated={false}
        hideAdd
        activeKey={activePage}
        onChange={handleTabChange}
        onEdit={handleEditTab}
      >
        {markPages.map(path => (
          <TabPane key={path} tab={menusMap[path]} closable={closable}>
            <Suspense fallback={<LazyLoader />}>
              {render(routesMap[path].component)}
            </Suspense>
          </TabPane>
        ))}
      </Tabs>
      <Tooltip placement="topRight" title="关闭其他">
        <Icon
          className={styles.remove}
          type="delete"
          onClick={handleRemoveOtherPages}
        />
      </Tooltip>
    </div>
  );
}

export default memo(PageMarker);
