/* eslint-disable class-methods-use-this */
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";

import JinjaContextProvider from "./JinjaContextProvider";

/**
 * @summary Provides jsonSchema only.
 */
abstract class JSONSchemaDataProvider extends JinjaContextProvider {
    get jsonSchema(): JSONSchema {
        throw new Error("Not implemented.");
    }
}

export default JSONSchemaDataProvider;
