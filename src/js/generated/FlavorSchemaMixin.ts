import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { FlavorPropertiesSchema } from "@mat3ra/esse/dist/js/types";

export type FlavorSchemaMixin = FlavorPropertiesSchema;

export type FlavorInMemoryEntity = InMemoryEntity & FlavorSchemaMixin;

export function flavorSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & FlavorSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity & FlavorSchemaMixin = {
        get executableId() {
            return this.requiredProp<FlavorPropertiesSchema["executableId"]>("executableId");
        },
        set executableId(value: FlavorPropertiesSchema["executableId"]) {
            this.setProp("executableId", value);
        },
        get executableName() {
            return this.prop<FlavorPropertiesSchema["executableName"]>("executableName");
        },
        set executableName(value: FlavorPropertiesSchema["executableName"]) {
            this.setProp("executableName", value);
        },
        get applicationName() {
            return this.prop<FlavorPropertiesSchema["applicationName"]>("applicationName");
        },
        set applicationName(value: FlavorPropertiesSchema["applicationName"]) {
            this.setProp("applicationName", value);
        },
        get input() {
            return this.requiredProp<FlavorPropertiesSchema["input"]>("input");
        },
        set input(value: FlavorPropertiesSchema["input"]) {
            this.setProp("input", value);
        },
        get supportedApplicationVersions() {
            return this.prop<FlavorPropertiesSchema["supportedApplicationVersions"]>(
                "supportedApplicationVersions",
            );
        },
        set supportedApplicationVersions(
            value: FlavorPropertiesSchema["supportedApplicationVersions"],
        ) {
            this.setProp("supportedApplicationVersions", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
