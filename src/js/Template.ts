import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import {
    type NamedInMemoryEntityConstructor,
    namedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { TemplateSchema } from "@mat3ra/esse/dist/js/types";

import { type TemplateMixin, type TemplateStaticMixin, templateMixin } from "./templateMixin";

type Base = typeof InMemoryEntity &
    Constructor<TemplateMixin> &
    NamedInMemoryEntityConstructor &
    TemplateStaticMixin;

export default class Template extends (InMemoryEntity as Base) implements TemplateSchema {
    constructor(data: Partial<TemplateSchema> = {}) {
        super({
            applicationName: "",
            executableName: "",
            content: "",
            contextProviders: [],
            ...data,
        });
    }

    declare toJSON: () => TemplateSchema & AnyObject;
}

namedEntityMixin(Template.prototype);
templateMixin(Template);
