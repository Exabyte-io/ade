import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import {
    type DefaultableInMemoryEntityConstructor,
    defaultableEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import {
    type NamedInMemoryEntityConstructor,
    namedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import {
    type RuntimeItemsInMemoryEntityConstructor,
    runtimeItemsMixin,
} from "@mat3ra/code/dist/js/entity/mixins/RuntimeItemsMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { ExecutableSchema } from "@mat3ra/esse/dist/js/types";

import { type ExecutableMixin, executableMixin } from "./executableMixin";

type Base = Constructor<ExecutableMixin> &
    RuntimeItemsInMemoryEntityConstructor &
    NamedInMemoryEntityConstructor &
    DefaultableInMemoryEntityConstructor &
    typeof InMemoryEntity;

export default class Executable extends (InMemoryEntity as Base) implements ExecutableSchema {
    constructor(data: Partial<ExecutableSchema> = {}) {
        super({
            monitors: [],
            results: [],
            postProcessors: [],
            preProcessors: [],
            applicationId: [],
            ...data,
        });
    }

    declare static createDefault: () => Executable;
}

namedEntityMixin(Executable.prototype);
defaultableEntityMixin(Executable);
runtimeItemsMixin(Executable.prototype);
executableMixin(Executable);
