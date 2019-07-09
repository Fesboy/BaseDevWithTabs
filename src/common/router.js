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

function getRoutes(routes, parentPath = "") {
  return routes.map(route => {
    const { path, component, children } = route;
    const completePath = parentPath + path;
    if (children) {
      route.children = getRoutes(children, completePath);
    }

    return {
      ...route,
      path: completePath,
      component: lazy(component)
    };
  });
}

function getRoutesMap(routes) {
  return routes.reduce((prev, route) => {
    const { path, children } = route;
    if (children) {
      Object.assign(prev, getRoutesMap(children));
    }
    return (prev[path] = route), prev;
  }, {});
}

function getMenus(routes, parentPath = "") {
  return routes.map(route => {
    const { path, name, children } = route;
    const completePath = parentPath + path;
    const menu = { path: completePath, name };
    if (children && children.some(item => !item.hideInMenu)) {
      menu.children = getMenus(children, completePath);
    }
    return menu;
  });
}

function getMenusMap(menus) {
  return menus.reduce((prev, menu) => {
    const { path, name, children } = menu;
    if (children && children.some(item => !item.hideInMenu)) {
      Object.assign(prev, getMenusMap(children));
    }
    return (prev[path] = name), prev;
  }, {});
}

export const routes = getRoutes(routeConfig);
export const routesMap = getRoutesMap(routes);
export const menus = getMenus(routeConfig);
export const menusMap = getMenusMap(menus);
