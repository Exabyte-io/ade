import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { FlavorPropertiesSchema } from "@mat3ra/esse/dist/js/types";

export type FlavorSchemaMixin = FlavorPropertiesSchema;

export function flavorSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & FlavorSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity<FlavorSchemaMixin> & FlavorSchemaMixin = {
        get executableName() {
            return this.requiredProp("executableName");
        },
        set executableName(value: FlavorPropertiesSchema["executableName"]) {
            this.setProp("executableName", value);
        },
        get applicationName() {
            return this.requiredProp("applicationName");
        },
        set applicationName(value: FlavorPropertiesSchema["applicationName"]) {
            this.setProp("applicationName", value);
        },
        get applicationVersion() {
            return this.requiredProp("applicationVersion");
        },
        set applicationVersion(value: FlavorPropertiesSchema["applicationVersion"]) {
            this.setProp("applicationVersion", value);
        },
        get input() {
            return this.requiredProp("input");
        },
        set input(value: FlavorPropertiesSchema["input"]) {
            this.setProp("input", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
