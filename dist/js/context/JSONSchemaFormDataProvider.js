"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JSONSchemaDataProvider_1 = __importDefault(require("./JSONSchemaDataProvider"));
/**
 * @summary Provides jsonSchema and uiSchema for generating react-jsonschema-form
 *          See https://github.com/mozilla-services/react-jsonschema-form for Form UI.
 *          Form generation example:
 * ```
 * <Form schema={provider.jsonSchema}
 *      uiSchema={provider.uiSchema}
 *      formData={provider.getData(unit.important)} />
 * ```
 */
// TODO: MOVE to WebApp/ave or wove
class JSONSchemaFormDataProvider extends JSONSchemaDataProvider_1.default {
    get uiSchema() {
        throw new Error("Not implemented.");
    }
    get fields() {
        return {};
    }
    get defaultFieldStyles() {
        return {};
    }
    get uiSchemaStyled() {
        const schema = this.uiSchema;
        return Object.fromEntries(Object.entries(schema).map(([key, value]) => [
            key,
            {
                ...value,
                ...this.defaultFieldStyles,
                classNames: `${value.classNames || ""}`,
            },
        ]));
    }
}
exports.default = JSONSchemaFormDataProvider;
