import { RouteValue, RouteData } from '../../router/route-data';
import { isObject, isArray, isString, isNumber, isBoolean } from "util";
import { injectable } from 'inversify';
import { PlainRouteData } from './tree-router/plain-route-data';
import { join } from "lodash";

const SEPARATOR = "@";

@injectable()
export class RouteDataHelper {
    public isBoolean(object: RouteValue): object is boolean {
        return isBoolean(object);
    }
    
    public isNumber(object: RouteValue): object is number {
        return isNumber(object);
    }
    
    public isString(object: RouteValue): object is string {
        return isString(object);
    }

    public isRouteData(object: RouteValue): object is RouteData {
        return isObject(object) && !isArray(object);
    }

    public isArrayString(object: RouteValue) : object is string[] {
        return isArray(object) && object.length && isString(object[0]);
    }

    public isArrayNumber(object: RouteValue) : object is number[] {
        return isArray(object) && object.length && isNumber(object[0]);
    }

    public isRouteDataArray(object: RouteValue) : object is (number[] | string[]) {
        return this.isArrayNumber(object) || this.isArrayString(object);
    }

    public turnIntoPlainRouteData(routeData: RouteData, propertyChain: string[] = []): PlainRouteData {
        var plainRouteData: PlainRouteData = {};

        Object.keys(routeData).forEach(property => {

            var value = routeData[property];

            if (this.isRouteData(value)) {
                plainRouteData = {
                    ...plainRouteData,
                    ...this.turnIntoPlainRouteData(value, [property, ...propertyChain])
                };
            }
            else {
                plainRouteData[this.getPropertyString(propertyChain, property)] = value;
            }
        });

        return plainRouteData;
    }

    private getPropertyString(propertyChain: string[], property: string): string {
        return join([property, ...propertyChain], SEPARATOR);
    }
}