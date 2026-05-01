import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { FlavorPropertiesSchema } from "@mat3ra/esse/dist/js/types";

export type FlavorSchemaMixin = FlavorPropertiesSchema;

export type FlavorInMemoryEntity = InMemoryEntity & FlavorSchemaMixin;

export function flavorSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & FlavorSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity & FlavorSchemaMixin = {
        get executableName() {
            return this.requiredProp<FlavorPropertiesSchema["executableName"]>("executableName");
        },
        set executableName(value: FlavorPropertiesSchema["executableName"]) {
            this.setProp("executableName", value);
        },
        get applicationName() {
            return this.requiredProp<FlavorPropertiesSchema["applicationName"]>("applicationName");
        },
        set applicationName(value: FlavorPropertiesSchema["applicationName"]) {
            this.setProp("applicationName", value);
        },
        get applicationVersion() {
            return this.requiredProp<FlavorPropertiesSchema["applicationVersion"]>(
                "applicationVersion",
            );
        },
        set applicationVersion(value: FlavorPropertiesSchema["applicationVersion"]) {
            this.setProp("applicationVersion", value);
        },
        get input() {
            return this.requiredProp<FlavorPropertiesSchema["input"]>("input");
        },
        set input(value: FlavorPropertiesSchema["input"]) {
            this.setProp("input", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
