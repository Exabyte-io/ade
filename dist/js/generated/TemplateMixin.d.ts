import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { TemplateMixinSchema } from "@mat3ra/esse/dist/js/types";
export type TemplateMixin = TemplateMixinSchema;
export type TemplateMixin = InMemoryEntity & TemplateMixin;
export declare function templateMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & TemplateMixin;
