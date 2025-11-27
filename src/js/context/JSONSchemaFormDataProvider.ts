/* eslint-disable class-methods-use-this */
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
// TODO: MOVE to WebApp/ave or wove
export default class JSONSchemaFormDataProvider extends JSONSchemaDataProvider {
    get uiSchema(): UiSchema {
        throw new Error("Not implemented.");
    }

    get fields() {
        return {};
    }

    get defaultFieldStyles() {
        return {};
    }

    get uiSchemaStyled(): UiSchema {
        const schema = this.uiSchema;
        return Object.fromEntries(
            Object.entries(schema).map(([key, value]) => [
                key,
                {
                    ...value,
                    ...this.defaultFieldStyles,
                    classNames: `${value.classNames || ""}`,
                },
            ]),
        );
    }
}
