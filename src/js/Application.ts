import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import {
    type DefaultableInMemoryEntityConstructor,
    defaultableEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import {
    type NamedInMemoryEntityConstructor,
    namedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { ApplicationSchema } from "@mat3ra/esse/dist/js/types";

import {
    type ApplicationMixin,
    type ApplicationStaticMixin,
    applicationMixin,
} from "./applicationMixin";

type Base = typeof InMemoryEntity &
    NamedInMemoryEntityConstructor &
    DefaultableInMemoryEntityConstructor &
    Constructor<ApplicationMixin> &
    ApplicationStaticMixin;

export default class Application extends (InMemoryEntity as Base) implements ApplicationSchema {
    constructor(data: Partial<ApplicationSchema> = {}) {
        super({
            ...data,
        });
    }

    declare static createDefault: () => Application;
}

namedEntityMixin(Application.prototype);
defaultableEntityMixin(Application);
applicationMixin(Application);
