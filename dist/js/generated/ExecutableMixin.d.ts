import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { ExecutableMixinSchema } from "@mat3ra/esse/dist/js/types";
export type ExecutableMixin = ExecutableMixinSchema;
export type ExecutableMixin = InMemoryEntity & ExecutableMixin;
export declare function executableMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & ExecutableMixin;
