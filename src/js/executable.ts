import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import {
    type DefaultableInMemoryEntity,
    defaultableEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import {
    type NamedEntity,
    namedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import {
    type RuntimeItems,
    runtimeItemsMixin,
} from "@mat3ra/code/dist/js/entity/mixins/RuntimeItemsMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { ExecutableSchema } from "@mat3ra/esse/dist/js/types";

import { type ExecutableMixin, executableMixin } from "./executableMixin";

type Base = Constructor<ExecutableMixin> &
    Constructor<RuntimeItems> &
    Constructor<NamedEntity> &
    Constructor<DefaultableInMemoryEntity> &
    typeof InMemoryEntity;

export default class Executable extends (InMemoryEntity as Base) {
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
}

namedEntityMixin(Executable.prototype);
defaultableEntityMixin(Executable);
runtimeItemsMixin(Executable.prototype);
executableMixin(Executable);
