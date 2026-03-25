"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationSchemaMixin = applicationSchemaMixin;
function applicationSchemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get shortName() {
            return this.requiredProp("shortName");
        },
        set shortName(value) {
            this.setProp("shortName", value);
        },
        get summary() {
            return this.requiredProp("summary");
        },
        set summary(value) {
            this.setProp("summary", value);
        },
        get version() {
            return this.requiredProp("version");
        },
        set version(value) {
            this.setProp("version", value);
        },
        get build() {
            return this.requiredProp("build");
        },
        set build(value) {
            this.setProp("build", value);
        },
        get isDefault() {
            return this.prop("isDefault");
        },
        set isDefault(value) {
            this.setProp("isDefault", value);
        },
        get hasAdvancedComputeOptions() {
            return this.prop("hasAdvancedComputeOptions");
        },
        set hasAdvancedComputeOptions(value) {
            this.setProp("hasAdvancedComputeOptions", value);
        },
        get isLicensed() {
            return this.prop("isLicensed");
        },
        set isLicensed(value) {
            this.setProp("isLicensed", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
