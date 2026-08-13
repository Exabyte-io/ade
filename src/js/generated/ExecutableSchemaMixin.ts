import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type {
    BaseInMemoryEntitySchema,
    ExecutablePropertiesSchema,
} from "@mat3ra/esse/dist/js/types";

export type ExecutableSchemaMixin = ExecutablePropertiesSchema;

export type ExecutableInMemoryEntity = InMemoryEntity<
    BaseInMemoryEntitySchema & ExecutableSchemaMixin
>;

export function executableSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & ExecutableSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity<ExecutableSchemaMixin> & ExecutableSchemaMixin = {
        get applicationName() {
            return this.requiredProp("applicationName");
        },
        set applicationName(value: ExecutablePropertiesSchema["applicationName"]) {
            this.setProp("applicationName", value);
        },
        get applicationVersion() {
            return this.requiredProp("applicationVersion");
        },
        set applicationVersion(value: ExecutablePropertiesSchema["applicationVersion"]) {
            this.setProp("applicationVersion", value);
        },
        get hasAdvancedComputeOptions() {
            return this.prop("hasAdvancedComputeOptions");
        },
        set hasAdvancedComputeOptions(
            value: ExecutablePropertiesSchema["hasAdvancedComputeOptions"],
        ) {
            this.setProp("hasAdvancedComputeOptions", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
