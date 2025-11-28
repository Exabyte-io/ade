import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import JinjaContextProvider from "./JinjaContextProvider";
/**
 * @summary Provides jsonSchema only.
 */
declare abstract class JSONSchemaDataProvider extends JinjaContextProvider {
    get jsonSchema(): JSONSchema;
}
export default JSONSchemaDataProvider;
