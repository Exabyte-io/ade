"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flavorSchemaMixin = flavorSchemaMixin;
function flavorSchemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get executableName() {
            return this.requiredProp("executableName");
        },
        set executableName(value) {
            this.setProp("executableName", value);
        },
        get applicationName() {
            return this.requiredProp("applicationName");
        },
        set applicationName(value) {
            this.setProp("applicationName", value);
        },
        get applicationVersion() {
            return this.requiredProp("applicationVersion");
        },
        set applicationVersion(value) {
            this.setProp("applicationVersion", value);
        },
        get input() {
            return this.requiredProp("input");
        },
        set input(value) {
            this.setProp("input", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
