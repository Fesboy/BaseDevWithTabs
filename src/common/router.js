import { getRoutes, getRoutesMap, getMenus } from "./_utils";

const routeConfig = [
  {
    path: "/",
    name: "home",
    models: ["home"],
    component: () => import("../pages/home")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../pages/about")
  },
  {
    path: "/list",
    name: "list",
    component: () => import("../pages/list"),
    children: [
      {
        path: "/detail",
        name: "detail",
        hideInMenu: true,
        component: () => import("../pages/list/detail")
      }
    ]
  }
];

export const routes = getRoutes(routeConfig);
export const routesMap = getRoutesMap(routes);
export const menus = getMenus(routeConfig);
