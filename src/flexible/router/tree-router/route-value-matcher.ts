import { RouteDataHelper } from "../../../router";
import { PlainRouteData } from "./plain-route-data";

export class RouteValueMatcher {

    constructor(
        private routeDataHelper: RouteDataHelper,
        private propertyKey: string,
        private value: string | number | boolean) {
            
        }

    isMatch(routeData: PlainRouteData): boolean {
        
        var value = routeData[this.propertyKey];
    
        if(this.routeDataHelper.isRouteDataArray(value)) {
            return !!(value as (string | number)[]).find(x => x === this.value);
        }

        return value === this.value;
    }
}

