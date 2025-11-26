import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { FlavorMixinSchema } from "@mat3ra/esse/dist/js/types";
export type FlavorMixin = FlavorMixinSchema;
export type FlavorMixin = InMemoryEntity & FlavorMixin;
export declare function flavorMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & FlavorMixin;
