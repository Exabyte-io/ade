"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executableMixin = executableMixin;
function executableMixin(item) {
    // @ts-expect-error
    const properties = {
        get name() {
            return this.requiredProp("name");
        },
        set name(value) {
            this.setProp("name", value);
        },
        get applicationId() {
            return this.prop("applicationId");
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
