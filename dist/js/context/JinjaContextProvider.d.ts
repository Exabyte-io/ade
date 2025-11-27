import { ContextProviderSchema } from "@mat3ra/esse/dist/js/types";
import ContextProvider from "./ContextProvider";
interface JSONSchemaDataProviderConfig extends ContextProviderSchema {
    isUsingJinjaVariables?: boolean;
}
export default class JinjaContextProvider extends ContextProvider {
    isUsingJinjaVariables: boolean;
    constructor(config: JSONSchemaDataProviderConfig);
}
export {};
