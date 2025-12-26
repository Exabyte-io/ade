import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { TemplateSchema } from "@mat3ra/esse/dist/js/types";

import { type TemplateSchemaMixin, templateSchemaMixin } from "./generated/TemplateSchemaMixin";

export type TemplateBase = InMemoryEntity;

export type TemplateMixin = TemplateSchemaMixin;

export type TemplateStaticMixin = {
    jsonSchema: TemplateSchema;
};

export function templateStaticMixin(item: Constructor<TemplateBase>) {
    // @ts-ignore
    const properties: TemplateStaticMixin & Constructor<TemplateBase> = {
        get jsonSchema() {
            return JSONSchemasInterface.getSchemaById("software/template") as TemplateSchema;
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

export function templateMixin(Item: Constructor<TemplateBase>) {
    templateSchemaMixin(Item.prototype);
    templateStaticMixin(Item);
}
