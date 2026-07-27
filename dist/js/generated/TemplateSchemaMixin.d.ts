import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { TemplatePropertiesSchema } from "@mat3ra/esse/dist/js/types";
export type TemplateSchemaMixin = TemplatePropertiesSchema;
export declare function templateSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & TemplateSchemaMixin;
