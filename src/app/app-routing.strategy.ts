import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";

export class AppReuseStrategy implements RouteReuseStrategy {

  public static handlers: { [key: string]: DetachedRouteHandle } = {};
  public static deleteRouteSnapshot(path: string): void {
    const name = path.replace(/\//g, '_');
    if (AppReuseStrategy.handlers[name]) {
      delete AppReuseStrategy.handlers[name];
    }
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig && JSON.stringify(future.params) === JSON.stringify(curr.params);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    AppReuseStrategy.handlers[this.getPath(route)] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!AppReuseStrategy.handlers[this.getPath(route)];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return AppReuseStrategy.handlers[this.getPath(route)] || null;
  }

  private getPath(route: ActivatedRouteSnapshot): string {
    // tslint:disable-next-line: no-string-literal
    const path = route['_routerState'].url.replace(/\//g, '_');
    return path;
  }

}