import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { FlavorPropertiesSchema } from "@mat3ra/esse/dist/js/types";
export type FlavorSchemaMixin = FlavorPropertiesSchema;
export type FlavorInMemoryEntity = InMemoryEntity & FlavorSchemaMixin;
export declare function flavorSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & FlavorSchemaMixin;
