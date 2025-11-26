"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flavorMixin = flavorMixin;
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const FlavorSchemaMixin_1 = require("./generated/FlavorSchemaMixin");
// TODO: should we add fields from esse schema (executableId, executableName, applicationName)?
function flavorPropertiesMixin(item) {
    // @ts-expect-error
    const properties = {
    // TODO: there is no "isMultiMaterial" field in the schema; should we add it?
    // get disableRenderMaterials() {
    //     return this.prop("isMultiMaterial", false);
    // },
    // TODO: do we actually use this method anywhere?
    // getInputAsRenderedTemplates(context: Record<string, unknown>) {
    //     return this.input?.map((template) => {
    //         if (template && typeof template === "object" && "getRenderedJSON" in template) {
    //             return template.getRenderedJSON(context);
    //         }
    //         return template;
    //     });
    // },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function flavorStaticMixin(Flavor) {
    const properties = {
        get jsonSchema() {
            return JSONSchemasInterface_1.default.getSchemaById("software/flavor");
        },
    };
    Object.defineProperties(Flavor, Object.getOwnPropertyDescriptors(properties));
}
function flavorMixin(Item) {
    (0, FlavorSchemaMixin_1.flavorSchemaMixin)(Item.prototype);
    flavorPropertiesMixin(Item.prototype);
    flavorStaticMixin(Item);
}
