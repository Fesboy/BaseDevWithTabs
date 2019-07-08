import { lazy } from "react";

const routeConfig = [
  {
    path: "/",
    name: "home",
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
    routes: [
      {
        path: "/detail",
        name: "detail",
        component: () => import("../pages/list/detail")
      }
    ]
  }
];

function getRoutes(routes) {
  return routes.map(route => {
    const { component } = route;
    return {
      ...route,
      component: lazy(component)
    };
  });
}

function getRoutesMap(routes) {
  return routes.reduce((prev, route) => {
    const { path } = route;
    return (prev[path] = route), prev;
  }, {});
}

function getMenus(routes) {
  return routes.map(route => {
    const { path, name } = route;
    return {
      path,
      name
    };
  });
}

function getMenusMap(menus) {
  return menus.reduce((prev, menu) => {
    const { path, name } = menu;
    return (prev[path] = name), prev;
  }, {});
}

export const routes = getRoutes(routeConfig);
export const routesMap = getRoutesMap(routes);
export const menus = getMenus(routeConfig);
export const menusMap = getMenusMap(menus);
