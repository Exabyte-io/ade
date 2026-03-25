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
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { ExecutableSchema } from "@mat3ra/esse/dist/js/types";

import { type ExecutableMixin, executableMixin } from "./executableMixin";
import type { PartialBy } from "./typeUtils";

/** Input for {@link Executable}: runtime item lists default to empty when omitted. */
export type ExecutableConstructorData = PartialBy<
    ExecutableSchema,
    "monitors" | "results" | "postProcessors" | "preProcessors"
>;

type Base = Constructor<ExecutableMixin> &
    RuntimeItemsInMemoryEntityConstructor &
    NamedInMemoryEntityConstructor &
    DefaultableInMemoryEntityConstructor &
    typeof InMemoryEntity;

export default class Executable extends (InMemoryEntity as Base) implements ExecutableSchema {
    constructor(data: ExecutableConstructorData) {
        super({
            ...data,
            monitors: data.monitors ?? [],
            results: data.results ?? [],
            postProcessors: data.postProcessors ?? [],
            preProcessors: data.preProcessors ?? [],
        });
    }

    declare static createDefault: () => Executable;

    declare toJSON: () => ExecutableSchema & AnyObject;
}

namedEntityMixin(Executable.prototype);
defaultableEntityMixin(Executable);
runtimeItemsMixin(Executable.prototype);
executableMixin(Executable);
