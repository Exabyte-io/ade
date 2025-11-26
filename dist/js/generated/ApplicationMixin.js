"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationMixin = applicationMixin;
function applicationMixin(item) {
    // @ts-expect-error
    const properties = {
        get shortName() {
            return this.prop("shortName");
        },
        set shortName(value) {
            this.setProp("shortName", value);
        },
        get summary() {
            return this.prop("summary");
        },
        set summary(value) {
            this.setProp("summary", value);
        },
        get version() {
            return this.prop("version");
        },
        set version(value) {
            this.setProp("version", value);
        },
        get build() {
            return this.prop("build");
        },
        set build(value) {
            this.setProp("build", value);
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
