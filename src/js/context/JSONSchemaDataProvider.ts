/* eslint-disable class-methods-use-this */
import JinjaContextProvider from "./JinjaContextProvider";

/**
 * @summary Provides jsonSchema only.
 */
export default class JSONSchemaDataProvider extends JinjaContextProvider {
    get jsonSchema() {
        throw new Error("Not implemented.");
    }
}
