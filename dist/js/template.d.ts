import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type NamedEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { TemplateSchema } from "@mat3ra/esse/dist/js/types";
import { type TemplateMixin, type TemplateStaticMixin } from "./templateMixin";
type Base = typeof InMemoryEntity & Constructor<TemplateMixin> & Constructor<NamedEntity> & TemplateStaticMixin;
declare const Template_base: Base;
export default class Template extends Template_base {
    constructor(data?: Partial<TemplateSchema>);
}
export {};
