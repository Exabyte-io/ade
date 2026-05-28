import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import {
    type Defaultable,
    defaultableEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import {
    type NamedEntity,
    namedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import { runtimeItemsMixin } from "@mat3ra/code/dist/js/entity/mixins/RuntimeItemsMixin";
import type { RuntimeItemsInMemoryEntity } from "@mat3ra/code/dist/js/generated/RuntimeItemsSchemaMixin";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import type { ExecutableSchema } from "@mat3ra/esse/dist/js/types";

import {
    type ExecutableSchemaMixin,
    executableSchemaMixin,
} from "./generated/ExecutableSchemaMixin";
import type { PartialBy } from "./typeUtils";

/** Input for {@link Executable}: runtime item lists default to empty when omitted. */
export type ExecutableConstructorData = PartialBy<
    ExecutableSchema,
    "monitors" | "results" | "postProcessors" | "preProcessors"
>;

interface Executable
    extends ExecutableSchemaMixin,
        RuntimeItemsInMemoryEntity,
        NamedEntity,
        Defaultable {}

class Executable extends InMemoryEntity implements ExecutableSchema {
    constructor(data: ExecutableConstructorData) {
        super({
            ...data,
            monitors: data.monitors ?? [],
            results: data.results ?? [],
            postProcessors: data.postProcessors ?? [],
            preProcessors: data.preProcessors ?? [],
        });
    }

    static get jsonSchema(): JSONSchema {
        const schema = JSONSchemasInterface.getSchemaById("software/executable");
        if (schema === undefined) {
            throw new Error('JSONSchemasInterface: missing schema id "software/executable"');
        }
        return schema;
    }

    declare static createDefault: () => Executable;

    declare toJSON: () => ExecutableSchema & AnyObject;
}

namedEntityMixin(Executable.prototype);
defaultableEntityMixin(Executable);
runtimeItemsMixin(Executable.prototype);
executableSchemaMixin(Executable.prototype);

export default Executable;
