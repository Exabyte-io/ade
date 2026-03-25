"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flavorSchemaMixin = flavorSchemaMixin;
function flavorSchemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get executableName() {
            return this.prop("executableName");
        },
        set executableName(value) {
            this.setProp("executableName", value);
        },
        get applicationName() {
            return this.prop("applicationName");
        },
        set applicationName(value) {
            this.setProp("applicationName", value);
        },
        get input() {
            return this.requiredProp("input");
        },
        set input(value) {
            this.setProp("input", value);
        },
        get supportedApplicationVersions() {
            return this.prop("supportedApplicationVersions");
        },
        set supportedApplicationVersions(value) {
            this.setProp("supportedApplicationVersions", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
