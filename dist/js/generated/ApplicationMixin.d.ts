import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { ApplicationMixinSchema } from "@mat3ra/esse/dist/js/types";
export type ApplicationMixin = ApplicationMixinSchema;
export type ApplicationMixin = InMemoryEntity & ApplicationMixin;
export declare function applicationMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & ApplicationMixin;
