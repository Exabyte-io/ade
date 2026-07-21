import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import {
    type NamedEntity,
    namedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import type { TemplateSchema } from "@mat3ra/esse/dist/js/types";

import { type TemplateSchemaMixin, templateSchemaMixin } from "./generated/TemplateSchemaMixin";
import type { PartialBy } from "./typeUtils";

type Schema = TemplateSchema;

interface Template extends TemplateSchemaMixin, NamedEntity {}

export type DefaultTemplateConfig = PartialBy<Schema, "content" | "contextProviders">;

class Template<S extends Schema = Schema> extends InMemoryEntity<S> implements Schema {
    static get jsonSchema(): JSONSchema {
        const schema = JSONSchemasInterface.getSchemaById("software/template");
        if (schema === undefined) {
            throw new Error('JSONSchemasInterface: missing schema id "software/template"');
        }
        return schema;
    }
}

namedEntityMixin(Template.prototype);
templateSchemaMixin(Template.prototype);

export default Template;
