import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type NamedEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import type { TemplateSchema } from "@mat3ra/esse/dist/js/types";
import { type TemplateSchemaMixin } from "./generated/TemplateSchemaMixin";
import type { PartialBy } from "./typeUtils";
type Schema = TemplateSchema;
interface Template extends TemplateSchemaMixin, NamedEntity {
}
export type DefaultTemplateConfig = PartialBy<Schema, "content" | "contextProviders">;
declare class Template<S extends Schema = Schema> extends InMemoryEntity<S> implements Schema {
    static get jsonSchema(): JSONSchema;
}
export default Template;
