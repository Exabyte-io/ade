import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type NamedEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import type { TemplateSchema } from "@mat3ra/esse/dist/js/types";
import { type TemplateSchemaMixin } from "./generated/TemplateSchemaMixin";
import type { PartialBy } from "./typeUtils";
interface Template extends TemplateSchemaMixin, NamedEntity {
}
export type DefaultTemplateConfig = PartialBy<TemplateSchema, "content" | "contextProviders">;
declare class Template extends InMemoryEntity implements TemplateSchema {
    constructor(data: DefaultTemplateConfig);
    static get jsonSchema(): JSONSchema;
    toJSON: () => TemplateSchema & AnyObject;
}
export default Template;
