"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executableSchemaMixin = executableSchemaMixin;
function executableSchemaMixin(item) {
    // @ts-expect-error
    const properties = {
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
        get hasAdvancedComputeOptions() {
            return this.prop("hasAdvancedComputeOptions");
        },
        set hasAdvancedComputeOptions(value) {
            this.setProp("hasAdvancedComputeOptions", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
