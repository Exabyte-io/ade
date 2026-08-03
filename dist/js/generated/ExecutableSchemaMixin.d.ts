import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { BaseInMemoryEntitySchema, ExecutablePropertiesSchema } from "@mat3ra/esse/dist/js/types";
export type ExecutableSchemaMixin = ExecutablePropertiesSchema;
export type ExecutableInMemoryEntity = InMemoryEntity<BaseInMemoryEntitySchema & ExecutableSchemaMixin>;
export declare function executableSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & ExecutableSchemaMixin;
