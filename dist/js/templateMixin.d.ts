import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { TemplateSchema } from "@mat3ra/esse/dist/js/types";
import { type TemplateSchemaMixin } from "./generated/TemplateSchemaMixin";
export type TemplateBase = InMemoryEntity;
export type TemplateMixin = TemplateSchemaMixin;
export type TemplateStaticMixin = {
    jsonSchema: TemplateSchema;
};
export declare function templateStaticMixin(item: Constructor<TemplateBase>): void;
export declare function templateMixin(Item: Constructor<TemplateBase>): void;
