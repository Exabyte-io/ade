"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateStaticMixin = templateStaticMixin;
exports.templateMixin = templateMixin;
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const TemplateSchemaMixin_1 = require("./generated/TemplateSchemaMixin");
function templateStaticMixin(item) {
    // @ts-ignore
    const properties = {
        get jsonSchema() {
            return JSONSchemasInterface_1.default.getSchemaById("software/template");
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
function templateMixin(Item) {
    (0, TemplateSchemaMixin_1.templateSchemaMixin)(Item.prototype);
    templateStaticMixin(Item);
}
