"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationMixin = applicationMixin;
exports.applicationStaticMixin = applicationStaticMixin;
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const standata_1 = require("@mat3ra/standata");
function applicationMixin(item) {
    // @ts-expect-error
    const properties = {
        get summary() {
            return this.prop("summary");
        },
        get version() {
            return this.prop("version", "");
        },
        get build() {
            return this.prop("build");
        },
        get shortName() {
            return this.prop("shortName", this.name);
        },
        get hasAdvancedComputeOptions() {
            return this.prop("hasAdvancedComputeOptions", false);
        },
        get isLicensed() {
            return this.prop("isLicensed", false);
        },
        get isUsingMaterial() {
            return this.prop("isUsingMaterial", false);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
function applicationStaticMixin(Application) {
    const properties = {
        get defaultConfig() {
            return new standata_1.ApplicationStandata().getDefaultConfig();
        },
        get jsonSchema() {
            return JSONSchemasInterface_1.default.getSchemaById("software/application");
        },
    };
    Object.defineProperties(Application, Object.getOwnPropertyDescriptors(properties));
}
