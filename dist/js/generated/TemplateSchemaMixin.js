"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateSchemaMixin = templateSchemaMixin;
function templateSchemaMixin(item) {
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
        get contextProviders() {
            return this.requiredProp("contextProviders");
        },
        set contextProviders(value) {
            this.setProp("contextProviders", value);
        },
        get content() {
            return this.requiredProp("content");
        },
        set content(value) {
            this.setProp("content", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
