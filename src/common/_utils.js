import { lazy } from "react";

export function getRoutes(routes, parentPath = "") {
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

export function getRoutesMap(routes) {
  return routes.reduce((prev, route) => {
    const { path, children } = route;
    if (children) {
      Object.assign(prev, getRoutesMap(children));
    }
    return (prev[path] = route), prev;
  }, {});
}

export function getMenus(routes, parentPath = "") {
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

export function getMenusMap(menus) {
  return menus.reduce((prev, menu) => {
    const { path, name, children } = menu;
    if (children && children.some(item => !item.hideInMenu)) {
      Object.assign(prev, getMenusMap(children));
    }
    return (prev[path] = name), prev;
  }, {});
}
