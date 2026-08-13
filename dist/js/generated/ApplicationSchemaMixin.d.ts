import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { ApplicationPropertiesSchema, BaseInMemoryEntitySchema } from "@mat3ra/esse/dist/js/types";
export type ApplicationSchemaMixin = ApplicationPropertiesSchema;
export type ApplicationInMemoryEntity = InMemoryEntity<BaseInMemoryEntitySchema & ApplicationSchemaMixin>;
export declare function applicationSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & ApplicationSchemaMixin;
