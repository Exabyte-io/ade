import type { UiSchema } from "react-jsonschema-form";
import JSONSchemaDataProvider from "./JSONSchemaDataProvider";
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
export default class JSONSchemaFormDataProvider extends JSONSchemaDataProvider {
    get uiSchema(): UiSchema;
    get fields(): {};
    get defaultFieldStyles(): {};
    get uiSchemaStyled(): UiSchema;
}
