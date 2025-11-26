import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { ExecutablePropertiesSchema } from "@mat3ra/esse/dist/js/types";

export type ExecutableSchemaMixin = ExecutablePropertiesSchema;

export type ExecutableInMemoryEntity = InMemoryEntity & ExecutableSchemaMixin;

export function executableSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & ExecutableSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity & ExecutableSchemaMixin = {
        get name() {
            return this.requiredProp<ExecutablePropertiesSchema["name"]>("name");
        },
        set name(value: ExecutablePropertiesSchema["name"]) {
            this.setProp("name", value);
        },
        get applicationId() {
            return this.requiredProp<ExecutablePropertiesSchema["applicationId"]>("applicationId");
        },
        set applicationId(value: ExecutablePropertiesSchema["applicationId"]) {
            this.setProp("applicationId", value);
        },
        get hasAdvancedComputeOptions() {
            return this.prop<ExecutablePropertiesSchema["hasAdvancedComputeOptions"]>(
                "hasAdvancedComputeOptions",
            );
        },
        set hasAdvancedComputeOptions(
            value: ExecutablePropertiesSchema["hasAdvancedComputeOptions"],
        ) {
            this.setProp("hasAdvancedComputeOptions", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
