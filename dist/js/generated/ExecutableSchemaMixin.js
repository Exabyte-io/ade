"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executableSchemaMixin = executableSchemaMixin;
function executableSchemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get name() {
            return this.requiredProp("name");
        },
        set name(value) {
            this.setProp("name", value);
        },
        get applicationId() {
            return this.requiredProp("applicationId");
        },
        set applicationId(value) {
            this.setProp("applicationId", value);
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
