"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateMixin = templateMixin;
function templateMixin(item) {
    // @ts-expect-error
    const properties = {
        get applicationName() {
            return this.prop("applicationName");
        },
        set applicationName(value) {
            this.setProp("applicationName", value);
        },
        get applicationVersion() {
            return this.prop("applicationVersion");
        },
        set applicationVersion(value) {
            this.setProp("applicationVersion", value);
        },
        get executableName() {
            return this.prop("executableName");
        },
        set executableName(value) {
            this.setProp("executableName", value);
        },
        get contextProviders() {
            return this.prop("contextProviders");
        },
        set contextProviders(value) {
            this.setProp("contextProviders", value);
        },
        get isManuallyChanged() {
            return this.prop("isManuallyChanged");
        },
        set isManuallyChanged(value) {
            this.setProp("isManuallyChanged", value);
        },
        get name() {
            return this.requiredProp("name");
        },
        set name(value) {
            this.setProp("name", value);
        },
        get content() {
            return this.requiredProp("content");
        },
        set content(value) {
            this.setProp("content", value);
        },
        get rendered() {
            return this.prop("rendered");
        },
        set rendered(value) {
            this.setProp("rendered", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
