import RoutesList from "../routesList";


export function generatePath(routeName, params = {}) {
    const route = RoutesList.find(route => route.name === routeName);
    if (!route) throw new Error(`Route with name ${routeName} not found`);

    let path = route.path;
    for (const [key, value] of Object.entries(params)) {
        path = path.replace(`:${key}`, value);
    }
    return path;
}