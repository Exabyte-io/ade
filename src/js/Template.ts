import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import {
    type NamedEntity,
    namedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import type { TemplateSchema } from "@mat3ra/esse/dist/js/types";

import { type TemplateSchemaMixin, templateSchemaMixin } from "./generated/TemplateSchemaMixin";
import type { PartialBy } from "./typeUtils";

interface Template extends TemplateSchemaMixin, NamedEntity {}

export type DefaultTemplateConfig = PartialBy<TemplateSchema, "content" | "contextProviders">;

class Template extends InMemoryEntity implements TemplateSchema {
    constructor(data: DefaultTemplateConfig) {
        const templateData: TemplateSchema = {
            content: "",
            contextProviders: [],
            ...data,
        };

        super(templateData);
    }

    static get jsonSchema(): JSONSchema {
        const schema = JSONSchemasInterface.getSchemaById("software/template");
        if (schema === undefined) {
            throw new Error('JSONSchemasInterface: missing schema id "software/template"');
        }
        return schema;
    }

    declare toJSON: () => TemplateSchema & AnyObject;
}

namedEntityMixin(Template.prototype);
templateSchemaMixin(Template.prototype);

export default Template;
