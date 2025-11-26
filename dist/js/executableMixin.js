"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executableMixin = executableMixin;
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const ExecutableSchemaMixin_1 = require("./generated/ExecutableSchemaMixin");
function executableStaticMixin(Executable) {
    const properties = {
        get jsonSchema() {
            return JSONSchemasInterface_1.default.getSchemaById("software/executable");
        },
    };
    Object.defineProperties(Executable, Object.getOwnPropertyDescriptors(properties));
}
function executableMixin(Item) {
    (0, ExecutableSchemaMixin_1.executableSchemaMixin)(Item.prototype);
    executableStaticMixin(Item);
}
