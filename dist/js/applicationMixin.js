"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationMixin = applicationMixin;
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const standata_1 = require("@mat3ra/standata");
const ApplicationSchemaMixin_1 = require("./generated/ApplicationSchemaMixin");
function applicationPropertiesMixin(item) {
    // @ts-expect-error
    const properties = {
        get isUsingMaterial() {
            const materialUsingApplications = ["vasp", "nwchem", "espresso"];
            return materialUsingApplications.includes(this.name);
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
function applicationMixin(Item) {
    (0, ApplicationSchemaMixin_1.applicationSchemaMixin)(Item.prototype);
    applicationPropertiesMixin(Item.prototype);
    applicationStaticMixin(Item);
}
