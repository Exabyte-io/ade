"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flavorMixin = flavorMixin;
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const FlavorSchemaMixin_1 = require("./generated/FlavorSchemaMixin");
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
    flavorStaticMixin(Item);
}
